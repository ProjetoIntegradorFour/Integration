import requests
import time
import logging

# ================= CONFIG =================

BASE_URL = "http://10.109.3.161:8080"
TOKEN = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMjMiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTc2NTkwNjAzOSwiZXhwIjoxNzY1OTkyNDM5fQ.ag9Ty8ZvwVKExUdO_uIXsNO6zQ1cDP8AZNIZ55qGpkJTcOyHEfLH7KXesaQBOmJr"
DEBUG = True
REQUEST_DELAY = 0.3

# ================= LOGGING =================

logging.basicConfig(
    level=logging.DEBUG if DEBUG else logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)

# ================= HEADERS =================

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# ================= DATA =================

isbns = [
    "1848562780",
    "9895644515",
    "9724606392",
    "0856609587",
    "8571647844",
    "6555522267",
    "6587034209",
    "9781539572626",
    "6558380544",
    "6555320354",
    "9786555321449",
    "9798657058246",
    "8584390677",
    "9789681684983",
    "8578601777",
    "8501115827",
    "8573261854",
    "9781074060510",
    "9781078331975",
    "1932664084",
    "0713999659",
    "9786557172292",
    "8499281265",
    "8498526922",
    "9788585934231",
    "8418680296",
    "9727089356",
    "0805059962",
    "8525406791",
    "8500016795",
    "8538083724",
    "9781259918322",
    "9798697558973",
    "8582850409",
    "9723830388"
]

genres = [
    "Aventura, Ficção",
    "Romance",
    "Apostilas",
    "Apostilas, Artes",
    "Ficção",
    "Literatura Clássica, Ficção",
    "Literatura Clássica, Ficção",
    "Romance",
    "Romance, Ficção",
    "Romance",
    "Aventura, Ficção",
    "Literatura Clássica",
    "Literatura Clássica",
    "História",
    "História",
    "História",
    "História, Literatura Estrangeira",
    "Apostilas",
    "Apostilas",
    "Romance, Ficção",
    "Apostilas",
    "Ciência Política",
    "Ciência Política",
    "Ciência Política",
    "Ciência Política",
    "Biografia",
    "Biografia",
    "Biografia",
    "Literatura Clássica",
    "Literatura Clássica",
    "Aventura, Ficção",
    "Apostilas",
    "Literatura Estrangeira",
    "Romance, Literatura Estrangeira",
    "Literatura Estrangeira"
]

novidades_isbns = {
    "8538083724",
    "9788585934231",
    "1848562780",
    "8571647844",
    "8555340896"
}

popular_isbns = {
    "9723830388",
    "9788585934231",
    "1947172042",
    "8576831953"
}

# ================= HELPERS =================

def build_genres(base_genres: str, isbn: str) -> str:
    genre_set = {g.strip() for g in base_genres.split(",") if g.strip()}

    if isbn in novidades_isbns:
        genre_set.add("Novidades")

    if isbn in popular_isbns:
        genre_set.add("Livros Populares")

    final = ", ".join(sorted(genre_set))
    logger.debug(f"Genres built for ISBN {isbn}: {final}")
    return final


def log_response(method, url, isbn, response):
    if response.ok:
        logger.info(f"[{method}] {isbn} → {response.status_code}")
    else:
        logger.error(
            f"[{method}] {isbn} → {response.status_code} | Response: {response.text}"
        )


# ================= MAIN =================

session = requests.Session()
session.headers.update(HEADERS)

logger.info("Starting POST /fetch batch")

for isbn in isbns:
    url = f"{BASE_URL}/admin/catalog/fetch/{isbn}"

    try:
        logger.debug(f"POST {url}")
        response = session.post(url, timeout=15)
        log_response("POST", url, isbn, response)

    except requests.RequestException as e:
        logger.exception(f"[POST] {isbn} → Request failed: {e}")

    time.sleep(REQUEST_DELAY)


logger.info("Starting PATCH /catalog batch")

for isbn, base_genre in zip(isbns, genres):
    url = f"{BASE_URL}/admin/catalog/{isbn}"
    payload = {"genres": build_genres(base_genre, isbn)}

    try:
        logger.debug(f"PATCH {url} | Payload: {payload}")
        response = session.patch(url, json=payload, timeout=15)
        log_response("PATCH", url, isbn, response)

    except requests.RequestException as e:
        logger.exception(f"[PATCH] {isbn} → Request failed: {e}")

    time.sleep(REQUEST_DELAY)


logger.info("Batch processing finished")
