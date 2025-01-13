
from fastapi import FastAPI, Form,  Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

"""
Dando permição para o angular se conectar com o backend
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:4200"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


"""
Vetor que representa o banco de dados
"""
suplementos= []

@app.get('/suplementos')
async def listSuplementos():
    return suplementos

"""
    Pegando os dados da aplicação
"""
@app.get("/suplementos/{suplemento_id}")
async def getForIDSuplementos(suplemento_id: int):
    for suplemento in suplementos:
        if suplemento["suplemento_id"] == suplemento_id:
            return suplemento
        raise HTTPException (status_code=404, detail="O ID do seu suplemento não está registrado.")
    
"""
Inserindo os dados na aplicação
"""
@app.post("/suplementos/criar")
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

"""
Atualizando os dados da aplicação
"""
@app.put("/suplementos/editar")
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


"""
Deletando dados da aplicação
"""
@app.delete("/suplementos/deletar/{suplemento_id}")
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

