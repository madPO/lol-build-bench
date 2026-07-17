FROM fedora:43

ARG USER_NAME=marko
ARG USER_UID=1000
ARG USER_GID=1000

ENV LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    TZ=Etc/UTC

# Core OS packages + Google Chrome.
RUN dnf -y install dnf-plugins-core && \
    dnf config-manager setopt fedora-cisco-openh264.enabled=0 && \
    dnf config-manager setopt fedora-cisco-openh264-debuginfo.enabled=0 || true
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    printf '%s\n' \
        '[google-chrome]' \
        'name=google-chrome' \
        'baseurl=https://dl.google.com/linux/chrome/rpm/stable/x86_64' \
        'enabled=1' \
        'gpgcheck=1' \
        'gpgkey=https://dl.google.com/linux/linux_signing_key.pub' \
        > /etc/yum.repos.d/google-chrome.repo && \
    dnf -y update && \
    dnf -y install \
        bash \
        bubblewrap \
        ca-certificates \
        curl \
        dotnet-sdk-10.0 \
        findutils \
        gcc \
        gcc-c++ \
        git \
        glibc-langpack-en \
        golang \
        google-chrome-stable \
        iputils \
        jq \
        make \
        mtr \
        nodejs24 \
        npm \
        openssh-server \
        procps-ng \
        python3 \
        python3-pip \
        ripgrep \
        shadow-utils \
        sudo \
        tar \
        traceroute \
        unzip \
        vim \
        wget \
        which \
        xz \
        zsh && \
    dnf clean all && \
    rm -rf /var/cache/dnf

# User, workspace, SSH host keys, and system Git defaults.
RUN groupadd -g ${USER_GID} ${USER_NAME} && \
    useradd -u ${USER_UID} -g ${USER_GID} -m -s /bin/zsh ${USER_NAME} && \
    usermod -aG wheel ${USER_NAME} && \
    echo '%wheel ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/90-nopasswd && \
    chmod 440 /etc/sudoers.d/90-nopasswd && \
    mkdir -p /workspace /home/${USER_NAME}/.codex /var/run/sshd && \
    chown -R ${USER_NAME}:${USER_NAME} /workspace /home/${USER_NAME}/.codex && \
    ssh-keygen -A && \
    git config --system user.name 'madPO' && \
    git config --system user.email 'madpo.s.a@gmail.com'

ENV HOME=/home/${USER_NAME} \
    GOPATH=/home/${USER_NAME}/go \
    NPM_CONFIG_PREFIX=/home/${USER_NAME}/.local \
    PATH=/home/${USER_NAME}/.local/bin:/home/${USER_NAME}/go/bin:/home/${USER_NAME}/.opencode/bin:/usr/local/bin:/usr/bin:/bin

# Install Bun into /usr/local/bin, not only into the user's home directory.
# This makes `docker exec -it <container> zsh` resolve `bun` reliably.
RUN export BUN_INSTALL=/opt/bun && \
    curl -fsSL https://bun.sh/install | bash && \
    test -x /opt/bun/bin/bun && \
    install -m 0755 /opt/bun/bin/bun /usr/local/bin/bun && \
    ln -sf /usr/local/bin/bun /usr/local/bin/bunx && \
    rm -rf /opt/bun && \
    command -v bun && \
    bun --version && \
    command -v bunx && \
    bunx --version

USER ${USER_NAME}
WORKDIR /workspace

# User-level tools. Codex uses its standard state directory: /home/${USER_NAME}/.codex.
RUN git config --global user.name 'madPO' && \
    git config --global user.email 'madpo.s.a@gmail.com' && \
    curl -fsSL https://astral.sh/uv/install.sh | sh && \
    npm install -g @openai/codex@latest --include=optional && \
    curl -fsSL https://opencode.ai/install | bash

USER root

# Make user-installed CLIs available in non-login and zsh shells.
RUN ln -sf /home/${USER_NAME}/.local/bin/codex /usr/local/bin/codex && \
    ln -sf /home/${USER_NAME}/.local/bin/uv /usr/local/bin/uv && \
    ln -sf /home/${USER_NAME}/.local/bin/uvx /usr/local/bin/uvx && \
    printf '#!/usr/bin/env sh\nexec uvx --from git+https://github.com/github/spec-kit.git specify "$@"\n' > /usr/local/bin/specify && \
    chmod +x /usr/local/bin/specify && \
    printf '%s\n' \
      "export HOME=/home/${USER_NAME}" \
      "export GOPATH=/home/${USER_NAME}/go" \
      "export NPM_CONFIG_PREFIX=/home/${USER_NAME}/.local" \
      "export PATH=/home/${USER_NAME}/.local/bin:/home/${USER_NAME}/go/bin:/home/${USER_NAME}/.opencode/bin:/usr/local/bin:/usr/bin:/bin:\$PATH" \
      > /etc/profile.d/dev-path.sh && \
    chmod 644 /etc/profile.d/dev-path.sh && \
    grep -qxF 'source /etc/profile.d/dev-path.sh' /etc/zshenv || \
      printf '%s\n' 'source /etc/profile.d/dev-path.sh' >> /etc/zshenv && \
    command -v bun && \
    command -v bunx && \
    command -v zsh

# Persist only Codex's standard state directory.
# In docker compose, mount a named volume to this path.
VOLUME ["/home/${USER_NAME}/.codex"]

USER ${USER_NAME}
WORKDIR /workspace

CMD ["tail", "-f", "/dev/null"]
