import json


def get_json(path: str):

    with open(path) as f:
        data = [json.loads(line) for line in f]
        return data


if __name__ == '__main__':
    print(get_json('ecomm/out.jl')[0])