import json
from fastapi import FastAPI, Form, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def carregar_dados():
    try:
        with open('banco-de-dados/db.json', 'r') as file:
            dados = json.load(file)
            return dados.get('suplementos', []), dados.get('gymBros', [])
    except FileNotFoundError:
        return [], []
    except json.JSONDecodeError:
        return [], []

def salvar_dados(suplementos, gymBros):
    dados = {
        'suplementos': suplementos,
        'gymBros': gymBros
    }
    with open('banco-de-dados/db.json', 'w') as file:
        json.dump(dados, file, indent=4)

suplementos, gymBros = carregar_dados()

@app.get('/suplementos')
async def list_suplementos():
    return suplementos

@app.get("/suplementos/{suplemento_id}")
async def get_suplemento_by_id(suplemento_id: int):
    for suplemento in suplementos:
        if suplemento["suplemento_id"] == suplemento_id:
            return suplemento
    raise HTTPException(status_code=404, detail="O ID do seu suplemento não está registrado.")

@app.post("/suplementos/criar")
async def criar_suplemento(
    nomeSuplemento: str = Form(...),
    marca: str = Form(...),
    valor: float = Form(...)
):
    suplemento = {
        "suplemento_id": len(suplementos) + 1,
        "nomeSuplemento": nomeSuplemento,
        "marca": marca,
        "valor": valor,
    }
    suplementos.append(suplemento)
    salvar_dados(suplementos, gymBros)
    return {'message': 'Suplemento adicionado com sucesso'}

@app.put("/suplementos/editar/{suplemento_id}")
async def update_suplemento(
    suplemento_id: int,
    nomeSuplemento: str = Form(...),
    marca: str = Form(...),
    valor: float = Form(...)
):
    for suplemento in suplementos:
        if suplemento["suplemento_id"] == suplemento_id:
            suplemento.update({'nomeSuplemento': nomeSuplemento, 'marca': marca, 'valor': valor})
            salvar_dados(suplementos, gymBros)  # Salvar dados após a atualização
            return {'message': 'Atualização feita com sucesso'}
    raise HTTPException(status_code=404, detail="Suplemento não foi encontrado.")

@app.delete("/suplementos/{suplemento_id}")
async def delete_suplemento(suplemento_id: int):
    for index, suplemento in enumerate(suplementos):
        if suplemento["suplemento_id"] == suplemento_id:
            suplementos.pop(index)
            salvar_dados(suplementos, gymBros)  # Salvar dados após a exclusão
            return {'message': 'O suplemento foi deletado'}
    raise HTTPException(status_code=404, detail="Suplemento não foi deletado.")

@app.get("/suplementosSearch")
async def search_suplementos(name: str = Query(...)):
    procurando_suplementos = [suplemento for suplemento in suplementos if name.lower() in suplemento["nomeSuplemento"].lower()]
    if procurando_suplementos:
        return {'suplementos encontrados': procurando_suplementos}
    raise HTTPException(status_code=404, detail="Verifique o nome do suplemento.")

@app.get('/usuario')
async def list_usuarios():
    return gymBros

@app.get("/usuario/{gymID}")
async def get_usuario_by_id(gymID: int):
    for usuario in gymBros:
        if usuario["gymID"] == gymID:
            return usuario
    raise HTTPException(status_code=404, detail="O ID do Usuário não está registrado.")

@app.post("/usuario/criar")
async def criar_usuario(
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
    salvar_dados(suplementos, gymBros)
    return {'message': 'Usuário adicionado com sucesso'}

@app.put("/usuario")
async def update_usuario(
    gymID: int,
    nome: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    senha: str = Form(...)
):
    for usuario in gymBros:
        if usuario["gymID"] == gymID:
            usuario.update({'nome': nome, 'email': email, 'telefone': telefone, 'senha': senha})
            salvar_dados(suplementos, gymBros)  # Salvar dados após a atualização
            return {'message': 'Atualização feita com sucesso'}
    raise HTTPException(status_code=404, detail="Usuário não foi atualizado.")

@app.delete("/usuario")
async def delete_usuario(gymID: int):
    for index, usuario in enumerate(gymBros):
        if usuario["gymID"] == gymID:
            gymBros.pop(index)
            salvar_dados(suplementos, gymBros)  # Salvar dados após a exclusão
            return {'message': 'O usuário foi deletado'}
    raise HTTPException(status_code=404, detail="Usuário não foi deletado.")

@app.get("/usuarioSearch")
async def search_usuario(name: str = Query(...)):
    procurando_usuario = [usuario for usuario in gymBros if name.lower() in usuario["nome"].lower()]
    if procurando_usuario:
        return {'usuários encontrados': procurando_usuario}
    raise HTTPException(status_code=404, detail="Verifique o nome do usuário.")

@app.post("/login")
async def login_usuario(email: str = Form(...), senha: str = Form(...)):
    for usuario in gymBros:
        if usuario["email"] == email and usuario["senha"] == senha:
            return {'message': 'Usuário logado com sucesso'}
    raise HTTPException(status_code=404, detail="Usuário não existe.")
