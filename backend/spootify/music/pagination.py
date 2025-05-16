from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

class ReactAdminPagination(LimitOffsetPagination):
    default_limit = 10  # Default page size

    def get_paginated_response(self, data):
        start = self.offset
        end = start + len(data) - 1
        content_range = f'albums {start}-{end}/{self.count}'

        response = Response(data)
        response['Content-Range'] = content_range
        return response