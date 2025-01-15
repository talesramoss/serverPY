
from fastapi import FastAPI, Form,  Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# PERMITINDO QUE O ANGULAR ACESSE O BACKEND

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:4200"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

suplementos= []
gymBros= []


@app.get('/suplementos')
async def listSuplementos():
    return suplementos


@app.get("/suplementos/{suplemento_id}")
async def getForIDSuplementos(suplemento_id: int):
    for suplemento in suplementos:
        if suplemento["suplemento_id"] == suplemento_id:
            return suplemento
        raise HTTPException (status_code=404, detail="O ID do seu suplemento não está registrado.")

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


@app.get('/usuario')
async def listSuplementos():
    return gymBros


@app.get("/usuario/{gymID}")
async def getForIDSuplementos(gymID: int):
    for usuario in gymBros:
        if usuario["gymID"] == gymID:
            return usuario
        raise HTTPException (status_code=404, detail="O ID do Usuario não está registrado.")

@app.post("/usuario")
async def criarUsuario(
    nome: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    senha: str = Form(...)
):
    usuario = {
        "gymID": len(gymBros) + 1,
        "nome": nome,
        "email": email,
        "telefone": telefone,
        "senha": senha
    }
    gymBros.append(usuario)
    return ('Usuario adicionado com sucesso')

@app.put("/usuario")
async def updateUsuario(
    gymID: int,
    nome: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    senha: str = Form(...)
):
    usuario = {
        "gymID": (len(gymBros) + 1),
        "nome": nome,
        "email": email,
        "telefone": telefone,
        "senha": senha
    }
    for usuario in gymBros:
        if usuario["gymID"] == gymID:
            usuario.update({'nome': nome, 'email': email, 'telefone': telefone, 'senha': senha })
            return 'Atulização feita com sucesso'
        raise HTTPException (status_code=404, detail="Usuario não foi atualizado.")

@app.delete("/usuario")
async def deleteUsuario(gymID: int):
    for apagador, usuario in enumerate(gymBros):
        if usuario["gymID"] ==  gymID:
            gymBros.pop(apagador)
            return 'o usuario foi deletado'
        raise HTTPException (status_code=404, detail="Usuario não foi deletado.")

@app.get("/usuarioSearch")
async def searchUsuario(name : str = Query(...)):
    procurandoUsuario = [usuario for usuario in gymBros if name.lower() in usuario["nome"].lower()]
    if procurandoUsuario:
        return {'o usuario é': procurandoUsuario}
    raise HTTPException (status_code=404, detail="Verifique o nome do usuario.")
