# syntax=docker/dockerfile:1

FROM busybox:1.36.1-uclibc AS busybox
FROM cloudflare/cloudflared:2024.6.1
COPY --from=busybox /bin/sh /bin/sh
COPY --from=busybox /bin/cat /bin/cat
ENTRYPOINT [ "/bin/sh", "-c", "export TUNNEL_TOKEN=$(cat /run/secrets/TUNNEL_TOKEN) ;  cloudflared --no-autoupdate tunnel run" ]