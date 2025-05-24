
# corp-mail
user@remote:~$ dig mail.veritablegames.com AAAA

; <<>> DiG 9.18.24-0ubuntu0.22.04.1-Ubuntu <<>> mail.veritablegames.com AAAA
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 10844
;; flags: qr aa rd ra ad; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;mail.veritablegames.com.	IN	AAAA

;; Query time: 0 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Mon Jul 15 21:30:59 PDT 2024
;; MSG SIZE  rcvd: 52

user@remote:~/Documents/Domain$ nc -zv mail.veritablegames.com 80
nc: connect to mail.veritablegames.com (10.175.1.103) port 80 (tcp) failed: No route to host
user@remote:~/Documents/Domain$ 

