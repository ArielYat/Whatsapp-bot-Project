FROM python:3.10.6
RUN useradd -d /home/david -m -s /bin/bash david
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt install -y wget git
RUN python --version
RUN apt-get install python3-pip -y
RUN apt-get install python3-virtualenv -y
RUN mkdir /home/david/app
RUN chown david:david -R /home/david/app
RUN chmod 755 -R /home/david/app
USER david
RUN virtualenv -p python3 /home/david/app/venv
WORKDIR /home/david/app
COPY . .
USER root
RUN /home/david/app/venv/bin/python get-pip.py
RUN /home/david/app/venv/bin/pip install fastapi
RUN /home/david/app/venv/bin/pip install "fastapi[all]"
RUN /home/david/app/venv/bin/pip install packaging
RUN chown david:david -R /home/david/app
RUN chmod 755 -R /home/david/app
RUN apt-get install libgl1 -y
USER david
RUN git config --global http.sslverify false
RUN /home/david/app/venv/bin/python --version
RUN /home/david/app/venv/bin/pip install -r requirements.txt
RUN /home/david/app/venv/bin/pip install -r requirements_versions.txt
RUN /home/david/app/venv/bin/pip install open_clip_torch numpy pyyaml addict imageio imageio-ffmpeg scikit-image tqdm tensorboardX opencv-python transformers git+https://github.com/openai/CLIP.git gdown send2trash xformers
CMD ["/home/david/app/venv/bin/python", "webui.py", "--xformers", "--api", "--listen", "--enable-insecure-extension-access", "--no-half-vae", "--no-half"]