
from fastapi import FastAPI, Form,  Query, HTTPException


app = FastAPI()

suplementos= []

@app.get('/suplementos')
async def listSuplementos():
    return suplementos


@app.get("/suplementos/{suplemento_id}")
async def getForIDSuplementos(suplemento_id: int):
    for suplemento in suplementos:
        if suplemento["suplemento_id"] == suplemento_id:
            return suplemento
        raise HTTPException (status_code=404, detail="O ID do seu suplemento não está registrado.")
    
@app.post("/suplementos")
async def criarSuplemento(
    nomeSuplemento: str = Form(...),
    marca: str = Form(...),
    valor: str = Form(...)
):
    suplemento = {
        "suplemento_id": len(suplementos) + 1, 
        "nomeSuplemento": nomeSuplemento,
        "marca": marca,
        "valor": valor,
    }
    suplementos.append(suplemento)
    return ('suplemento adicionado com sucesso')

@app.put("/suplementos")
async def updateSuplemento(
    suplemento_id: int,
    nomeSuplemento: str = Form(...),
    marca: str = Form(...),
    valor: str = Form(...)
):
    suplemento = {
        "suplemento_id": (len(suplementos) + 1), 
        "nomeSuplemento": nomeSuplemento,
        "marca": marca,
        "valor": valor,
    }
    for suplemento in suplementos:
        if suplemento["suplemento_id"] == suplemento_id:
            suplemento.update({'nomeSuplemento': nomeSuplemento, 'marca': marca, 'valor': valor })
            return 'Atulização feita com sucesso'
        raise HTTPException (status_code=404, detail="suplemento não foi atualizado.")

@app.delete("/suplementos")
async def deleteSuplemento(suplemento_id: int):
    for apagador, suplemento in enumerate(suplementos):
        if suplemento["suplemento_id"] ==  suplemento_id:
            suplementos.pop(apagador)
            return 'o suplemento foi deletado'
        raise HTTPException (status_code=404, detail="Suplemento não foi deletado.")
        
@app.get("/suplementosSearch")
async def searchSuplementos(name : str = Query(...)):
    procurandoSuplementos = [suplemento for suplemento in suplementos if name.lower() in suplemento["nomeSuplemento"].lower()]
    if procurandoSuplementos:
        return {'o seu suplmento é': procurandoSuplementos}
    raise HTTPException (status_code=404, detail="Verifique o nome do suplemento.")

