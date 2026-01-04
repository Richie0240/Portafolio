from __future__ import annotations

from dataclasses import dataclass
from typing import List

from flask import Flask, render_template


app = Flask(__name__)


@dataclass
class Project:
    name: str
    description: str
    url: str
    technologies: List[str]
    spotlight: bool = False


PROFILE = {
    "name": "Ricardo Ulate Alpizar",
    "role": "Estudiante de Ingeniería en Sistemas",
    "university": "Universidad Fidélitas",
    "year": "Último año",
    "bio": (
        "Apasionado por crear experiencias digitales atractivas y útiles. "
        "Me encanta aprender, construir y compartir proyectos que demuestren creatividad y buena ingeniería."
    ),
    "location": "San José, Costa Rica",
}

PROJECTS = [
    Project(
        name="Dashboard de Datos",
        description="Visualizaciones interactivas con gráficos dinámicos y filtros avanzados para datasets públicos.",
        url="https://ejemplo.com/dashboard",
        technologies=["Python", "Flask", "Chart.js", "PostgreSQL"],
        spotlight=True,
    ),
    Project(
        name="API de Tareas",
        description="Servicio REST para gestionar tareas con autenticación JWT y documentación Swagger.",
        url="https://ejemplo.com/api",
        technologies=["FastAPI", "Docker", "Redis"],
    ),
    Project(
        name="Landing Creativa",
        description="Sitio estático optimizado para SEO con animaciones sutiles y diseño mobile-first.",
        url="https://ejemplo.com/landing",
        technologies=["HTML", "CSS", "GSAP"],
    ),
    Project(
        name="Aplicación de Notas",
        description="Notas rápidas con sincronización en la nube y modo oscuro automático.",
        url="https://ejemplo.com/notas",
        technologies=["React", "Firebase", "Tailwind"],
    ),
]

SKILLS = [
    "Python",
    "Flask",
    "FastAPI",
    "SQL",
    "Docker",
    "HTML/CSS",
    "JavaScript",
    "Git",
]

SOCIALS = [
    {"label": "GitHub", "url": "https://github.com/", "icon": "fa-github"},
    {"label": "LinkedIn", "url": "https://www.linkedin.com/", "icon": "fa-linkedin"},
    {"label": "Correo", "url": "mailto:ricardo@correo.com", "icon": "fa-envelope"},
]


@app.route("/")
def index():
    spotlight = [project for project in PROJECTS if project.spotlight]
    others = [project for project in PROJECTS if not project.spotlight]
    return render_template(
        "index.html",
        profile=PROFILE,
        skills=SKILLS,
        socials=SOCIALS,
        spotlight_projects=spotlight,
        other_projects=others,
    )


if __name__ == "__main__":
    app.run(debug=True)
