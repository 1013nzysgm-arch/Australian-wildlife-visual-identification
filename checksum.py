import hashlib


def calculate_checksum(file_path):
    sha256 = hashlib.sha256()

    with open(file_path, "rb") as f:
        while True:
            chunk = f.read(4096)

            if not chunk:
                break

            sha256.update(chunk)

    return sha256.hexdigest()


if __name__ == "__main__":
    file_path = "images/Alectura_lathami_1.JPG"

    checksum = calculate_checksum(file_path)

    print("Checksum:")
    print(checksum)