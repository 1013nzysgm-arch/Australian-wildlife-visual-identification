from backend.processing.checksum import calculate_checksum

file_path = "images/Alectura_lathami_1.JPG"

checksum = calculate_checksum(file_path)

database = set()

# firstly
if checksum in database:
    print("duplicate file")
else:
    database.add(checksum)
    print("success")

# scecondly
if checksum in database:
    print("duplicate file")
else:
    database.add(checksum)
    print("success")