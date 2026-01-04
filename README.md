# Portafolio con Flask

Portafolio web minimalista y dinámico para mostrar proyectos destacados, habilidades y enlaces de contacto.

## Ejecutar en local

1. Crea un entorno virtual (opcional) e instala dependencias:

   ```bash
   pip install -r requirements.txt
   ```

2. Inicia el servidor:

   ```bash
   flask --app app run --debug
   ```

3. Abre <http://127.0.0.1:5000> en tu navegador.

## Personaliza

- Actualiza la lista `PROJECTS` en `app.py` con tus enlaces reales.
- Ajusta habilidades y redes sociales en las variables `SKILLS` y `SOCIALS`.
- Edita los estilos en `static/css/style.css` para adaptar la identidad visual.
