import graphene
from graphene_django import DjangoObjectType
from products.models import Product
from products.documents import es

class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = "__all__"

class Query(graphene.ObjectType):
    all_products = graphene.List(ProductType)
    search_products = graphene.List(ProductType, query=graphene.String(required=True))

    def resolve_all_products(self, info):
        return Product.objects.all()

    def resolve_search_products(self, info, query):
        if not query:
            return Product.objects.all()
        
        # Запрос в поисковый движок Elasticsearch
        response = es.search(index='products', query={
            "multi_match": {
                "query": query,
                "fields": ["name", "category"]
            }
        })
        
        # Безопасное извлечение текстовых ID и конвертация в int для БД
        ids = []
        for hit in response['hits']['hits']:
            try:
                ids.append(int(hit['_id']))
            except (ValueError, TypeError):
                continue
        
        return Product.objects.filter(id__in=ids)

schema = graphene.Schema(query=Query)