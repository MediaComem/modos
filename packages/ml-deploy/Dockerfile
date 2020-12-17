FROM python:3.8

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

ENV TANSERFLOW_SERVE_URI='http://tanserflow:8501'

EXPOSE 5000

COPY . .

CMD ["flask", "run", "-h", "0.0.0.0", "-p", "5000"]