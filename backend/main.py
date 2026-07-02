from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio Backend")

# Allowing all origins for the development phase
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/contact")
def submit_contact(form: ContactForm):
    # For now, just logging the message or validating
    # A real email relay can be set up here later
    print(f"Received contact from {form.name} ({form.email}): {form.message}")
    return {"message": "Contact form submitted successfully"}
