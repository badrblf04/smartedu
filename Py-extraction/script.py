from flask import Flask, request, jsonify
import os
from PyPDF2 import PdfReader
from werkzeug.utils import secure_filename
import magic  # Pour la détection du type de fichier

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploaded_files'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialiser magic pour la détection du type de fichier
mime = magic.Magic(mime=True)

def extract_text_from_pdf(filepath):
    """Extrait le texte d'un PDF."""
    text = ""
    with open(filepath, 'rb') as f:
        pdf_reader = PdfReader(f)
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def extract_text_from_txt(filepath):
    """Extrait le texte d'un fichier texte brut (.txt)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read().strip()

@app.route('/upload', methods=['POST'])
def handle_file_upload():
    """Endpoint pour traiter uniquement les fichiers PDF et TXT et extraire le texte."""
    if 'file' not in request.files:
        return jsonify({"error": "Aucun fichier dans la requête"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Aucun fichier sélectionné"}), 400

    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        file_mime_type = mime.from_file(filepath)
        result = {
            "filename": filename,
            "mime_type": file_mime_type,
            "status": "success"
        }

        # Extraction uniquement pour txt et pdf
        if file_mime_type == 'application/pdf':
            result["text"] = extract_text_from_pdf(filepath)
        elif file_mime_type == 'text/plain':
            result["text"] = extract_text_from_txt(filepath)
        else:
            result["message"] = "Seuls les fichiers PDF et TXT sont acceptés"
            result["status"] = "unsupported"

        os.remove(filepath)
        return jsonify(result), 200

    except Exception as e:
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({
            "error": f"Erreur lors du traitement du fichier: {str(e)}",
            "status": "error"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
