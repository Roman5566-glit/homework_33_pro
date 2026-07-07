from elasticsearch import Elasticsearch

es = Elasticsearch('http://localhost:9200')

def index_product(product):
    doc = {
        'name': product.name,
        'price': float(product.price),
        'category': product.category,
    }
    es.index(index='products', id=product.id, document=doc)