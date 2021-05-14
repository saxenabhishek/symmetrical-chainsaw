from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status


class CustomPagination(PageNumberPagination):
    
    max_page_size = 337
    page_query_param = "page"

    def get_paginated_response(self, data):
        
        return Response(
                    {
                    "page_count": self.page.paginator.count,
                    "result": data
                    },
                    status.HTTP_200_OK
        )
