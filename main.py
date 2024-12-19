from typing import List

from fastapi import FastAPI, Form, HTTPException, Query


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
    return ('foi')

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
            return 'ovo da galinha pintadinha'

@app.delete("/suplementos")
async def deleteSuplemento(suplemento_id: int):
    for apagador, suplemento in enumerate(suplementos):
        if suplemento["suplemento_id"] ==  suplemento_id:
            suplementos.pop(apagador)
            return 'happy birthid two you'



