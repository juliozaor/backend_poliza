/api/v1/aliados:
  post:
    tags: Pasajeros por carretera (PC)
    summary: Crear un registro
    requestBody:
      content:
        multipart/form-data:
          schema:
            type: object
            properties:
              minimoA:
                type: string
                description: valor minimo grupo A
              logo:
                type: file
                description: logotipo
              nit:
                type: string
                description: NIT del aliado
              linkAmigable:
                type: string
                description: Dirección web del aliado
              tiempo:
                type: integer
                description: duranción de la marcación en días
            required:
              - nombre
              - logo
              - linkAmigable
              - tiempo
    responses:
      200:
        description: Acción ejecutada correctamente
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Aliado"
      400:
        description: Petición incorrecta
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/400"
      500:
        description: Error en el servidor
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/500"
