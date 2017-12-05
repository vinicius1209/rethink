 ##### INSERÇÃO NA TABELA PRODUTOS

- Caso não seja definido um primary key, o rethink irá criar uma automaticamente

r.db('rethinkdb_ex').table("produtos").insert(
  
  {
    id: 1,
    saldo:100,
    descricao: "Tudo de Solda"
  }
  
)

- Selecionar o que foi mudado na minha inserção atual :

 r.db('rethinkdb_ex').table("produtos").insert(
  
  {
    id: 1,
    saldo:100,
    descricao: "Tudo de Solda"
  },
  
   {returnChanges: true}
)

- Caso ja exista um produto com o mesmo id, posso pedir para subsittuir:

r.db('rethinkdb_ex').table("produtos").insert(
    {id: "1", saldo: "10", descricao: "Corda 3M"},
    {conflict: "replace"}
)

- Copiar os documentos de produtos_antigos para produtos:

r.db('rethinkdb_ex').table("produtos").insert(r.table("produtos_antigos"))

### SELECT PRODUTO PELA PK 

r.db('rethinkdb_ex').table("produtos").get("dd782b64-70a7-43e4-b65e-dd14ae61d947")


### UPDATE PRODUTOS 

- Mudar o saldo do produto de id 1 para 100:

r.db('rethinkdb_ex').table("produtos").get(1).update({saldo: "100"})

- Update sem where de todos os produtos para saldo 50!!:

r.db('rethinkdb_ex').table("produtos").update({saldo: "50"})

- Update saldo de produto onde a descricao for "Corda 3M":

r.db('rethinkdb_ex').table("produtos").filter({descricao: "Corda 3M"}).update({saldo: "50"})

- Incrementar o preco em 1 da tabela de produtos para o produto de id 1: (Notar que este campo não existe, por isso do "Default (0)"

r.db('rethinkdb_ex').table("produtos").get(1).update({
    preco: r.row("preco").add(1).default(0)
})

#### Geo 

r.db('rethinkdb_ex').table('geo').insert({
    id: 300,
    name: 'Itajai',
    neighborhood: r.circle([-122.423246,37.779388], 1000)
})

