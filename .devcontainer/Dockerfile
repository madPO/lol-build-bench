FROM fedora:43

ARG USER_NAME=marko
ARG USER_UID=1000
ARG USER_GID=1000

RUN dnf -y update && dnf -y install \
    openssh-server \
    sudo \
    git \
    curl \
    wget \
    ca-certificates \
    make \
    gcc \
    glibc-langpack-en \
    golang \
    iputils \
    traceroute \
    mtr \
    unzip \
    vim \
    python3 \
    python3-pip \
    nodejs \
    procps-ng \
    && dnf clean all

ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

RUN groupadd -g ${USER_GID} ${USER_NAME} && \
    useradd -u ${USER_UID} -g ${USER_GID} -m ${USER_NAME} && \
    usermod -aG wheel ${USER_NAME} && \
    echo "%wheel ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/90-nopasswd

RUN mkdir -p /var/run/sshd

RUN sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    echo "PermitEmptyPasswords yes" >> /etc/ssh/sshd_config && \
    ssh-keygen -A

WORKDIR /workspace
RUN chown ${USER_NAME}:${USER_NAME} /workspace
USER ${USER_NAME}

RUN curl -fsSL https://opencode.ai/install | bash

RUN curl -fsSL https://bun.sh/install | bash

RUN curl -fsSL https://astral.sh/uv/install.sh | sh && \
    ln -s /root/.local/bin/uvx /usr/local/bin/uvx

RUN printf '#!/usr/bin/env sh\nexec uvx --from git+https://github.com/github/spec-kit.git specify "$@"\n' \
    > /usr/local/bin/specify && chmod +x /usr/local/bin/specify

ENV PATH="/root/.bun/bin:/usr/local/bin:${PATH}"

ENV GOPATH="/home/${USER_NAME}/go"
ENV PATH="/home/${USER_NAME}/.bun/bin:/usr/local/go/bin:${GOPATH}/bin:${PATH}"

USER root
EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
