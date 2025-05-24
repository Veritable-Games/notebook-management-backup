
# redpajamaprocess.txt
cwcorella@DESKTOP-42SH73T:~$ cd /mnt/production/repository
-bash: cd: /mnt/production/repository: No such file or directory
cwcorella@DESKTOP-42SH73T:~$ cd /mnt/f/production/repository
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository$ cd redpajama.cpp
-bash: cd: redpajama.cpp: No such file or directory
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository$ cd redpajama/redpajama.cpp
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ make redpajama-chat quantize-gptneox
I llama.cpp build info:
I UNAME_S:  Linux
I UNAME_P:  x86_64
I UNAME_M:  x86_64
I CFLAGS:   -I.              -O3 -std=c11   -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wdouble-promotion -Wshadow -Wstrict-prototypes -Wpointer-arith -pthread -march=native -mtune=native
I CXXFLAGS: -I. -I./examples -O3 -std=c++11 -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wno-unused-function -Wno-multichar -pthread -march=native -mtune=native
I LDFLAGS:
I CC:       cc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
I CXX:      g++ (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0

make: 'redpajama-chat' is up to date.
make: 'quantize-gptneox' is up to date.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ bash ./examples/redpajama/scripts/install-RedPajama-INCITE-Chat-3B-v1.sh
Downloading model
Removing temp cache dir
rm: cannot remove '../models/pythia-cache': No such file or directory
Quantizing model (q4_0)
Done.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ ./redpajama-chat -m ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin \
> -c 2048 \
> -b 128 \
> -n 1 \
> -t 8 \
> --instruct \
> --color \
> --top_k 30 \
> --top_p 0.95 \
> --temp 0.8 \
> --repeat_last_n 3 \
> --repeat_penalty 1.1 \
> --seed 0
main: seed = 1683659187
error loading model: failed to open ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin: No such file or directory
gptneox_init_from_file: failed to load model
main: error: failed to load model './examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin'
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ make redpajama-chat quantize-gptneox
I llama.cpp build info:
I UNAME_S:  Linux
I UNAME_P:  x86_64
I UNAME_M:  x86_64
I CFLAGS:   -I.              -O3 -std=c11   -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wdouble-promotion -Wshadow -Wstrict-prototypes -Wpointer-arith -pthread -march=native -mtune=native
I CXXFLAGS: -I. -I./examples -O3 -std=c++11 -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wno-unused-function -Wno-multichar -pthread -march=native -mtune=native
I LDFLAGS:
I CC:       cc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
I CXX:      g++ (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0

make: 'redpajama-chat' is up to date.
make: 'quantize-gptneox' is up to date.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ bash ./examples/redpajama/scripts/install-RedPajama-INCITE-Chat-3B-v1.sh
Downloading model
Removing temp cache dir
rm: cannot remove '../models/pythia-cache': No such file or directory
Quantizing model (q4_0)
Done.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ ./redpajama-chat -m ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin \
> -c 2048
main: seed = 1683664079
error loading model: failed to open ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin: No such file or directory
gptneox_init_from_file: failed to load model
main: error: failed to load model './examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin'
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ ./redpajama-chat -m ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin \
> -c 2048 \
> -b 128 \
> -n 1 \
> -t 8 \
> --instruct \
> --color \
> --top_k 30 \
> --top_p 0.95 \
> --temp 0.8 \
> --repeat_last_n 3 \
> --repeat_penalty 1.1 \
> --seed 0
main: seed = 1683664197
error loading model: failed to open ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin: No such file or directory
gptneox_init_from_file: failed to load model
main: error: failed to load model './examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-v1-f16.bin'
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ make redpajama-chat quantize-gptneox
I llama.cpp build info:
I UNAME_S:  Linux
I UNAME_P:  x86_64
I UNAME_M:  x86_64
I CFLAGS:   -I.              -O3 -std=c11   -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wdouble-promotion -Wshadow -Wstrict-prototypes -Wpointer-arith -pthread -march=native -mtune=native
I CXXFLAGS: -I. -I./examples -O3 -std=c++11 -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wno-unused-function -Wno-multichar -pthread -march=native -mtune=native
I LDFLAGS:
I CC:       cc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
I CXX:      g++ (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0

make: 'redpajama-chat' is up to date.
make: 'quantize-gptneox' is up to date.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ python ./convert_gptneox_to_ggml.py
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ python ./convert_gptneox_to_ggml.py together computer/RedPajama-INCITE-Chat-3B-v1 ../modelspythia
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ python ./convert_gptneox_to_ggml.py togethercomputer/RedPajama-INCITE-Chat-3B-v1 ../models/pythia
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ make redpajama chat quantize-gptneox
I llama.cpp build info:
I UNAME_S:  Linux
I UNAME_P:  x86_64
I UNAME_M:  x86_64
I CFLAGS:   -I.              -O3 -std=c11   -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wdouble-promotion -Wshadow -Wstrict-prototypes -Wpointer-arith -pthread -march=native -mtune=native
I CXXFLAGS: -I. -I./examples -O3 -std=c++11 -fPIC -DNDEBUG -Wall -Wextra -Wpedantic -Wcast-qual -Wno-unused-function -Wno-multichar -pthread -march=native -mtune=native
I LDFLAGS:
I CC:       cc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
I CXX:      g++ (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0

make: 'redpajama' is up to date.
make: *** No rule to make target 'chat'.  Stop.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ bash ./examples/redpajama/scripts/install-RedPajama-INCITE-Chat-3B-v1.sh
Downloading model
Removing temp cache dir
rm: cannot remove '../models/pythia-cache': No such file or directory
Quantizing model (q4_0)
Done.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ ./redpajama-chat -m ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-V1-f16.bin \
> -c 2048 \
> -b 128 \
> -n 1 \
> -t 8 \
> --instruct \
> --color \
> --top_k 30 \
> --top_p 0.95 \
> --temp 0.8 \
> --repeat_last_n 3 \
> --repeat_penalty 1.1 \
> --seed 0 \
>
main: seed = 1683669679
error loading model: failed to open ./examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-V1-f16.bin: No such file or directory
gptneox_init_from_file: failed to load model
main: error: failed to load model './examples/redpajama/models/pythia/ggml-RedPajama-INCITE-Chat-3B-V1-f16.bin'
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ python ./convert_gptneox_to_ggml.py togethercomputer/RedPajama-INCITE-Chat-3B-v1 ../models/pythia
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp$ cd ./examples/redpajama/scripts
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ python ./convert_gptneox_to_ggml.py togethercomputer/RedPajama-INCITE-Chat-3B-v1 ../models/pythia
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ python ./convert_gptneox_to_ggml.py togethercomputer/RedPajama-INCITE-Chat-3B-v1 ../models/pythia
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ python ./convert_gptneox_to_ggml.py togethercomputer/RedPajama-INCITE-Chat-3B-v1 ../models/pythia
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ dpkg -s <package-name>
-bash: syntax error near unexpected token `newline'
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ dpkg --list
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
lines 1-21...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
lines 1-22...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
lines 1-25...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
lines 1-28...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
lines 1-29...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
lines 1-30...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
lines 1-31...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
lines 1-32...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
lines 1-35...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
lines 1-36...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
lines 1-37...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
lines 1-40...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
lines 1-41...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
lines 1-42...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
lines 1-43...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
lines 1-44...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
lines 1-46...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
lines 1-47...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
lines 1-48...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
lines 1-49...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
lines 1-52...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
lines 1-53...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
lines 1-54...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
lines 1-56...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
lines 1-57...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
lines 1-58...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
lines 1-60...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
lines 1-61...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
lines 1-62...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
lines 1-63...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
lines 1-64...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
lines 1-65...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
lines 1-66...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
lines 1-67...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
lines 1-68...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
lines 1-69...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
lines 1-70...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
lines 1-71...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
lines 1-72...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
lines 1-73...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
lines 1-74...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
lines 1-75...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
lines 1-76...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
lines 1-77...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
lines 1-78...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
lines 1-79...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
ii  file                                             1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers
lines 1-80...skipping...
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
ii  file                                             1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers
ii  findutils                                        4.8.0-1ubuntu3                          amd64        utilities for finding files--find, xargs
lines 1-81
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
ii  file                                             1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers
lines 1-80
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
lines 1-79
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
lines 1-78
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
lines 1-77
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
lines 1-76
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
lines 1-75
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
lines 1-74
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
lines 1-73
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-================================================================================
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.8                                   amd64        commandline package manager
ii  apt-utils                                        2.4.8                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps environment
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integration)
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.3                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.2                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.2               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
ii  file                                             1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers
ii  findutils                                        4.8.0-1ubuntu3                          amd64        utilities for finding files--find, xargs
ii  flex                                             2.6.4-8build2                           amd64        fast lexical analyzer generator
ii  fontconfig                                       2.13.1-4.2ubuntu5                       amd64        generic font configuration library - support binaries
ii  fontconfig-config                                2.13.1-4.2ubuntu5                       all          generic font configuration library - configuration
ii  fonts-dejavu-core                                2.37-2build1                            all          Vera font family derivate with additional characters
ii  fonts-droid-fallback                             1:6.0.1r16-1.1build1                    all          handheld device font with extensive style and language support (fallback)
ii  fonts-noto-mono                                  20201225-1build1                        all          "No Tofu" monospaced font family with large Unicode coverage
ii  fonts-ubuntu                                     0.83-6ubuntu1                           all          sans-serif font set from Ubuntu
ii  fonts-urw-base35                                 20200910-1                              all          font set metric-compatible with the 35 PostScript Level 2 Base Fonts
ii  friendly-recovery                                0.2.42                                  all          Make recovery boot mode more user-friendly
ii  ftp                                              20210827-4build1                        all          dummy transitional package for tnftp
ii  fuse-overlayfs                                   1.7.1-1                                 amd64        implementation of overlay+shiftfs in FUSE for rootless containers
ii  fuse3                                            3.10.5-1build1                          amd64        Filesystem in Userspace (3.x version)
ii  g++                                              4:11.2.0-1ubuntu1                       amd64        GNU C++ compiler
ii  g++-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C++ compiler
ii  gawk                                             1:5.1.0-1build3                         amd64        GNU awk, a pattern scanning and processing language
ii  gcc                                              4:11.2.0-1ubuntu1                       amd64        GNU C compiler
ii  gcc-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C compiler
ii  gcc-11-base:amd64                                11.3.0-1ubuntu1~22.04                   amd64        GCC, the GNU Compiler Collection (base package)
ii  gcc-11-multilib                                  11.3.0-1ubuntu1~22.04                   amd64        GNU C compiler (multilib support)
ii  gcc-12-base:amd64                                12.1.0-2ubuntu1~22.04                   amd64        GCC, the GNU Compiler Collection (base package)
ii  gcc-multilib                                     4:11.2.0-1ubuntu1                       amd64        GNU C compiler (multilib files)
ii  gcr                                              3.40.0-4                                amd64        GNOME crypto services (daemon and tools)
ii  gdisk                                            1.0.8-4build1                           amd64        GPT fdisk text-mode partitioning tool
ii  gettext-base                                     0.21-4ubuntu4                           amd64        GNU Internationalization utilities for the base system
ii  ghostscript                                      9.55.0~dfsg1-0ubuntu5.2                 amd64        interpreter for the PostScript language and for PDF
ii  gir1.2-atk-1.0:amd64                             2.36.0-3build1                          amd64        ATK accessibility toolkit (GObject introspection)
ii  gir1.2-freedesktop:amd64                         1.72.0-1                                amd64        Introspection data for some FreeDesktop components
ii  gir1.2-gdkpixbuf-2.0:amd64                       2.42.8+dfsg-1ubuntu0.2                  amd64        GDK Pixbuf library - GObject-Introspection
ii  gir1.2-glib-2.0:amd64                            1.72.0-1                                amd64        Introspection data for GLib, GObject, Gio and GModule
ii  gir1.2-gst-plugins-base-1.0:amd64                1.20.1-1                                amd64        GObject introspection data for the GStreamer Plugins Base library
ii  gir1.2-gstreamer-1.0:amd64                       1.20.3-0ubuntu1                         amd64        GObject introspection data for the GStreamer library
ii  gir1.2-gtk-3.0:amd64                             3.24.33-1ubuntu2                        amd64        GTK graphical user interface library -- gir bindings
ii  gir1.2-gudev-1.0:amd64                           1:237-2build1                           amd64        libgudev-1.0 introspection data
ii  gir1.2-harfbuzz-0.0:amd64                        2.7.4-1ubuntu3.1                        amd64        OpenType text shaping engine (GObject introspection data)
ii  gir1.2-packagekitglib-1.0                        1.2.5-2ubuntu2                          amd64        GObject introspection data for the PackageKit GLib library
ii  gir1.2-pango-1.0:amd64                           1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text - gir bindings
ii  git                                              1:2.34.1-1ubuntu1.8                     amd64        fast, scalable, distributed revision control system
ii  git-man                                          1:2.34.1-1ubuntu1.8                     all          fast, scalable, distributed revision control system (manual pages)
ii  glib-networking:amd64                            2.72.0-1                                amd64        network-related giomodules for GLib
ii  glib-networking-common                           2.72.0-1                                all          network-related giomodules for GLib - data files
ii  glib-networking-services                         2.72.0-1                                amd64        network-related giomodules for GLib - D-Bus services
ii  gnome-desktop3-data                              42.5-0ubuntu1                           all          Common files for GNOME desktop apps
ii  gnome-keyring                                    40.0-3ubuntu3                           amd64        GNOME keyring services (daemon and tools)
ii  gnome-keyring-pkcs11:amd64                       40.0-3ubuntu3                           amd64        GNOME keyring module for the PKCS#11 module loading library
ii  gnupg                                            2.2.27-3ubuntu2.1                       all          GNU privacy guard - a free PGP replacement
ii  gnupg-l10n                                       2.2.27-3ubuntu2.1                       all          GNU privacy guard - localization files
ii  gnupg-utils                                      2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - utility programs
ii  gobject-introspection                            1.72.0-1                                amd64        Generate interface introspection data for GObject libraries
ii  golang-github-containernetworking-plugin-dnsname 1.3.1+ds1-2                             amd64        name resolution for containers
ii  golang-github-containers-common                  0.44.4+ds1-1                            all          Common files for github.com/containers repositories
ii  golang-github-containers-image                   5.16.0-3                                all          Configuration files and manpages for github.com/containers repositories
ii  gpg                                              2.2.27-3ubuntu2.1                       amd64        GNU Privacy Guard -- minimalist public key operations
ii  gpg-agent                                        2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - cryptographic agent
ii  gpg-wks-client                                   2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - Web Key Service client
ii  gpg-wks-server                                   2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - Web Key Service server
ii  gpgconf                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - core configuration utilities
ii  gpgsm                                            2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - S/MIME version
ii  gpgv                                             2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - signature verification tool
ii  graphicsmagick                                   1.4+really1.3.38-1ubuntu0.1             amd64        collection of image processing tools
ii  grep                                             3.7-1build1                             amd64        GNU grep, egrep and fgrep
ii  groff-base                                       1.22.4-8build1                          amd64        GNU troff text-formatting system (base system components)
ii  gsasl-common                                     1.10.0-5                                all          GNU SASL platform independent files
ii  gsettings-desktop-schemas                        42.0-1ubuntu1                           all          GSettings desktop-wide schemas
ii  gsfonts                                          1:8.11+urwcyr1.0.7~pre44-4.5            all          Fonts for the Ghostscript interpreter(s)
ii  gstreamer1.0-gl:amd64                            1.20.1-1                                amd64        GStreamer plugins for GL
ii  gstreamer1.0-plugins-base:amd64                  1.20.1-1                                amd64        GStreamer plugins from the "base" set
ii  gstreamer1.0-plugins-good:amd64                  1.20.3-0ubuntu1                         amd64        GStreamer plugins from the "good" set
ii  gstreamer1.0-x:amd64                             1.20.1-1                                amd64        GStreamer plugins for X11 and Pango
ii  gtk-update-icon-cache                            3.24.33-1ubuntu2                        amd64        icon theme caching utility
ii  guile-3.0-libs:amd64                             3.0.7-1                                 amd64        Core Guile libraries
ii  gvfs:amd64                                       1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - GIO module
ii  gvfs-backends                                    1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - backends
ii  gvfs-common                                      1.48.2-0ubuntu1                         all          userspace virtual filesystem - common data files
ii  gvfs-daemons                                     1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - servers
ii  gvfs-libs:amd64                                  1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - private libraries
ii  gzip                                             1.10-4ubuntu4.1                         amd64        GNU compression utilities
ii  hdparm                                           9.60+ds-1build3                         amd64        tune hard disk parameters for high performance
ii  hicolor-icon-theme                               0.17-2                                  all          default fallback theme for FreeDesktop.org icon themes
ii  hostname                                         3.23ubuntu2                             amd64        utility to set/show the host name or domain name
ii  htop                                             3.0.5-7build2                           amd64        interactive processes viewer
ii  humanity-icon-theme                              0.6.16                                  all          Humanity Icon theme
ii  i965-va-driver:amd64                             2.4.1+dfsg1-1                           amd64        VAAPI driver for Intel G45 & HD Graphics family
ii  imagemagick-6-common                             8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     all          image manipulation programs -- infrastructure
ii  imagemagick-6.q16                                8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation programs -- quantum depth Q16
ii  imagemagick-6.q16hdri                            8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation programs -- quantum depth Q16HDRI
ii  info                                             6.8-4build1                             amd64        Standalone GNU Info documentation browser
ii  init                                             1.62                                    amd64        metapackage ensuring an init system is installed
ii  init-system-helpers                              1.62                                    all          helper tools for all init systems
ii  install-info                                     6.8-4build1                             amd64        Manage installed documentation in info format
ii  intel-media-va-driver:amd64                      22.3.1+dfsg1-1ubuntu1                   amd64        VAAPI driver for the Intel GEN8+ Graphics family
ii  iproute2                                         5.15.0-1ubuntu2                         amd64        networking and traffic control tools
ii  iptables                                         1.8.7-1ubuntu5                          amd64        administration tools for packet filtering and NAT
ii  iputils-ping                                     3:20211215-1                            amd64        Tools to test the reachability of network hosts
ii  iputils-tracepath                                3:20211215-1                            amd64        Tools to trace the network path to a remote host
ii  irqbalance                                       1.8.0-1build1                           amd64        Daemon to balance interrupts for SMP systems
ii  isc-dhcp-client                                  4.4.1-2.3ubuntu2.4                      amd64        DHCP client for automatically obtaining an IP address
ii  isc-dhcp-common                                  4.4.1-2.3ubuntu2.4                      amd64        common manpages relevant to all of the isc-dhcp packages
ii  iso-codes                                        4.9.0-1                                 all          ISO language, territory, currency, script codes and their translations
ii  javascript-common                                11+nmu1                                 all          Base support for JavaScript library packages
ii  jupyter-core                                     4.9.1-1                                 all          Core common functionality of Jupyter projects (tools)
ii  kbd                                              2.3.0-3ubuntu4.22.04                    amd64        Linux console font and keytable utilities
ii  keyboard-configuration                           1.205ubuntu3                            all          system-wide keyboard preferences
ii  kmod                                             29-1ubuntu1                             amd64        tools for managing Linux kernel modules
ii  less                                             590-1ubuntu0.22.04.1                    amd64        pager program similar to more
ii  lib32asan6                                       11.3.0-1ubuntu1~22.04                   amd64        AddressSanitizer -- a fast memory error detector (32bit)
ii  lib32atomic1                                     12.1.0-2ubuntu1~22.04                   amd64        support library providing __atomic built-in functions (32bit)
ii  lib32gcc-11-dev                                  11.3.0-1ubuntu1~22.04                   amd64        GCC support library (32 bit development files)
ii  lib32gcc-s1                                      12.1.0-2ubuntu1~22.04                   amd64        GCC support library (32 bit Version)
ii  lib32gomp1                                       12.1.0-2ubuntu1~22.04                   amd64        GCC OpenMP (GOMP) support library (32bit)
ii  lib32itm1                                        12.1.0-2ubuntu1~22.04                   amd64        GNU Transactional Memory Library (32bit)
ii  lib32quadmath0                                   12.1.0-2ubuntu1~22.04                   amd64        GCC Quad-Precision Math Library (32bit)
ii  lib32stdc++6                                     12.1.0-2ubuntu1~22.04                   amd64        GNU Standard C++ Library v3 (32 bit Version)
ii  lib32ubsan1                                      12.1.0-2ubuntu1~22.04                   amd64        UBSan -- undefined behaviour sanitizer (32bit)
ii  libaa1:amd64                                     1.4p5-50build1                          amd64        ASCII art library
ii  libaacs0:amd64                                   0.11.1-1                                amd64        free-and-libre implementation of AACS
ii  libacl1:amd64                                    2.3.1-1                                 amd64        access control list - shared library
ii  libalgorithm-diff-perl                           1.201-1                                 all          module to find differences between files
ii  libalgorithm-diff-xs-perl                        0.04-6build3                            amd64        module to find differences between files (XS accelerated)
ii  libalgorithm-merge-perl                          0.08-3                                  all          Perl module for three-way merge of textual data
ii  libaom3:amd64                                    3.3.0-1                                 amd64        AV1 Video Codec Library
ii  libapparmor1:amd64                               3.0.4-2ubuntu2.2                        amd64        changehat AppArmor library
ii  libappstream4:amd64                              0.15.2-2                                amd64        Library to access AppStream services
ii  libapt-pkg6.0:amd64                              2.4.8                                   amd64        package management runtime library
ii  libarchive13:amd64                               3.6.0-1ubuntu1                          amd64        Multi-format archive and compression library (shared library)
ii  libargon2-1:amd64                                0~20171227-0.3                          amd64        memory-hard hashing function - runtime library
ii  libasan6:amd64                                   11.3.0-1ubuntu1~22.04                   amd64        AddressSanitizer -- a fast memory error detector
ii  libasound2:amd64                                 1.2.6.1-1ubuntu1                        amd64        shared library for ALSA applications
ii  libasound2-data                                  1.2.6.1-1ubuntu1                        all          Configuration files and profiles for ALSA drivers
ii  libasound2-dev:amd64                             1.2.6.1-1ubuntu1                        amd64        shared library for ALSA applications -- development files
ii  libass9:amd64                                    1:0.15.2-1                              amd64        library for SSA/ASS subtitles rendering
ii  libassuan0:amd64                                 2.5.5-1build1                           amd64        IPC library for the GnuPG components
ii  libasyncns0:amd64                                0.8-6build2                             amd64        Asynchronous name service query library
ii  libatasmart4:amd64                               0.19-5build2                            amd64        ATA S.M.A.R.T. reading and parsing library
ii  libatk-bridge2.0-0:amd64                         2.38.0-3                                amd64        AT-SPI 2 toolkit bridge - shared library
ii  libatk1.0-0:amd64                                2.36.0-3build1                          amd64        ATK accessibility toolkit
ii  libatk1.0-data                                   2.36.0-3build1                          all          Common files for the ATK accessibility toolkit
ii  libatm1:amd64                                    1:2.5.1-4build2                         amd64        shared library for ATM (Asynchronous Transfer Mode)
ii  libatomic1:amd64                                 12.1.0-2ubuntu1~22.04                   amd64        support library providing __atomic built-in functions
ii  libatopology2:amd64                              1.2.6.1-1ubuntu1                        amd64        shared library for handling ALSA topology definitions
ii  libatspi2.0-0:amd64                              2.44.0-3                                amd64        Assistive Technology Service Provider Interface - shared library
ii  libattr1:amd64                                   1:2.5.1-1build1                         amd64        extended attribute handling - shared library
ii  libaudit-common                                  1:3.0.7-1build1                         all          Dynamic library for security auditing - common files
ii  libaudit1:amd64                                  1:3.0.7-1build1                         amd64        Dynamic library for security auditing
ii  libavahi-client3:amd64                           0.8-5ubuntu5                            amd64        Avahi client library
ii  libavahi-common-data:amd64                       0.8-5ubuntu5                            amd64        Avahi common data files
ii  libavahi-common3:amd64                           0.8-5ubuntu5                            amd64        Avahi common library
ii  libavahi-glib1:amd64                             0.8-5ubuntu5                            amd64        Avahi GLib integration library
ii  libavc1394-0:amd64                               0.5.4-5build2                           amd64        control IEEE 1394 audio/video devices
ii  libavcodec58:amd64                               7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library with de/encoders for audio/video codecs - runtime files
ii  libavdevice58:amd64                              7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for handling input and output devices - runtime files
ii  libavfilter7:amd64                               7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library containing media filters - runtime files
ii  libavformat58:amd64                              7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library with (de)muxers for multimedia containers - runtime files
ii  libavutil56:amd64                                7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library with functions for simplifying programming - runtime files
ii  libbdplus0:amd64                                 0.2.0-1                                 amd64        implementation of BD+ for reading Blu-ray Discs
ii  libbinutils:amd64                                2.38-4ubuntu2.1                         amd64        GNU binary utilities (private shared library)
ii  libblas3:amd64                                   3.10.0-2ubuntu1                         amd64        Basic Linear Algebra Reference implementations, shared library
ii  libblkid-dev:amd64                               2.37.2-4ubuntu3                         amd64        block device ID library - headers
ii  libblkid1:amd64                                  2.37.2-4ubuntu3                         amd64        block device ID library
ii  libblockdev-crypto2:amd64                        2.26-1                                  amd64        Crypto plugin for libblockdev
ii  libblockdev-fs2:amd64                            2.26-1                                  amd64        file system plugin for libblockdev
ii  libblockdev-loop2:amd64                          2.26-1                                  amd64        Loop device plugin for libblockdev
ii  libblockdev-part-err2:amd64                      2.26-1                                  amd64        Partition error utility functions for libblockdev
ii  libblockdev-part2:amd64                          2.26-1                                  amd64        Partitioning plugin for libblockdev
ii  libblockdev-swap2:amd64                          2.26-1                                  amd64        Swap plugin for libblockdev
ii  libblockdev-utils2:amd64                         2.26-1                                  amd64        Utility functions for libblockdev
ii  libblockdev2:amd64                               2.26-1                                  amd64        Library for manipulating block devices
ii  libbluray2:amd64                                 1:1.3.1-1                               amd64        Blu-ray disc playback support library (shared library)
ii  libbpf0:amd64                                    1:0.5.0-1ubuntu22.04.1                  amd64        eBPF helper library (shared library)
ii  libbrotli-dev:amd64                              1.0.9-2build6                           amd64        library implementing brotli encoder and decoder (development files)
ii  libbrotli1:amd64                                 1.0.9-2build6                           amd64        library implementing brotli encoder and decoder (shared libraries)
ii  libbs2b0:amd64                                   3.1.0+dfsg-2.2build1                    amd64        Bauer stereophonic-to-binaural DSP library
ii  libbsd0:amd64                                    0.11.5-1                                amd64        utility functions from BSD systems - shared library
ii  libbz2-1.0:amd64                                 1.0.8-5build1                           amd64        high-quality block-sorting file compressor library - runtime
ii  libc-bin                                         2.35-0ubuntu3.1                         amd64        GNU C Library: Binaries
ii  libc-dev-bin                                     2.35-0ubuntu3.1                         amd64        GNU C Library: Development binaries
ii  libc-devtools                                    2.35-0ubuntu3.1                         amd64        GNU C Library: Development tools
ii  libc6:amd64                                      2.35-0ubuntu3.1                         amd64        GNU C Library: Shared libraries
ii  libc6-dev:amd64                                  2.35-0ubuntu3.1                         amd64        GNU C Library: Development Libraries and Header Files
ii  libc6-dev-i386                                   2.35-0ubuntu3.1                         amd64        GNU C Library: 32-bit development libraries for AMD64
ii  libc6-dev-x32                                    2.35-0ubuntu3.1                         amd64        GNU C Library: X32 ABI Development Libraries for AMD64
ii  libc6-i386                                       2.35-0ubuntu3.1                         amd64        GNU C Library: 32-bit shared libraries for AMD64
ii  libc6-x32                                        2.35-0ubuntu3.1                         amd64        GNU C Library: X32 ABI Shared libraries for AMD64
ii  libcaca0:amd64                                   0.99.beta19-2.2ubuntu4                  amd64        colour ASCII art library
ii  libcairo-gobject2:amd64                          1.16.0-5ubuntu2                         amd64        Cairo 2D vector graphics library (GObject library)
ii  libcairo-script-interpreter2:amd64               1.16.0-5ubuntu2                         amd64        Cairo 2D vector graphics library (script interpreter)
ii  libcairo2:amd64                                  1.16.0-5ubuntu2                         amd64        Cairo 2D vector graphics library
ii  libcairo2-dev:amd64                              1.16.0-5ubuntu2                         amd64        Development files for the Cairo 2D graphics library
ii  libcap-ng0:amd64                                 0.7.9-2.2build3                         amd64        An alternate POSIX capabilities library
ii  libcap2:amd64                                    1:2.44-1build3                          amd64        POSIX 1003.1e capabilities (library)
ii  libcap2-bin                                      1:2.44-1build3                          amd64        POSIX 1003.1e capabilities (utilities)
ii  libcbor0.8:amd64                                 0.8.0-2ubuntu1                          amd64        library for parsing and generating CBOR (RFC 7049)
ii  libcc1-0:amd64                                   12.1.0-2ubuntu1~22.04                   amd64        GCC cc1 plugin for GDB
ii  libcdio-cdda2:amd64                              10.2+2.0.0-1build3                      amd64        library to read and control digital audio CDs
ii  libcdio-paranoia2:amd64                          10.2+2.0.0-1build3                      amd64        library to read digital audio CDs with error correction
ii  libcdio19:amd64                                  2.1.0-3build1                           amd64        library to read and control CD-ROM
ii  libcdparanoia0:amd64                             3.10.2+debian-14build2                  amd64        audio extraction tool for sampling CDs (library)
ii  libchromaprint1:amd64                            1.5.1-2                                 amd64        audio fingerprint library
ii  libcodec2-1.0:amd64                              1.0.1-3                                 amd64        Codec2 runtime library
ii  libcolord2:amd64                                 1.4.6-1                                 amd64        system service to manage device colour profiles -- runtime
ii  libcom-err2:amd64                                1.46.5-2ubuntu1.1                       amd64        common error description library
ii  libcrypt-dev:amd64                               1:4.4.27-1                              amd64        libcrypt development files
ii  libcrypt1:amd64                                  1:4.4.27-1                              amd64        libcrypt shared library
ii  libcryptsetup12:amd64                            2:2.4.3-1ubuntu1.1                      amd64        disk encryption support - shared library
ii  libctf-nobfd0:amd64                              2.38-4ubuntu2.1                         amd64        Compact C Type Format library (runtime, no BFD dependency)
ii  libctf0:amd64                                    2.38-4ubuntu2.1                         amd64        Compact C Type Format library (runtime, BFD dependency)
ii  libcue2:amd64                                    2.2.1-3build3                           amd64        CUE Sheet Parser Library
ii  libcups2:amd64                                   2.4.1op1-1ubuntu4.1                     amd64        Common UNIX Printing System(tm) - Core library
ii  libcurl3-gnutls:amd64                            7.81.0-1ubuntu1.10                      amd64        easy-to-use client-side URL transfer library (GnuTLS flavour)
ii  libcurl4:amd64                                   7.81.0-1ubuntu1.10                      amd64        easy-to-use client-side URL transfer library (OpenSSL flavour)
ii  libdatrie1:amd64                                 0.2.13-2                                amd64        Double-array trie library
ii  libdav1d5:amd64                                  0.9.2-1                                 amd64        fast and small AV1 video stream decoder (shared library)
ii  libdb5.3:amd64                                   5.3.28+dfsg1-0.8ubuntu3                 amd64        Berkeley v5.3 Database Libraries [runtime]
ii  libdbus-1-3:amd64                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (library)
ii  libdbusmenu-glib4:amd64                          16.04.1+18.10.20180917-0ubuntu8         amd64        library for passing menus over DBus
ii  libdc1394-25:amd64                               2.2.6-4                                 amd64        high level programming interface for IEEE 1394 digital cameras
ii  libdconf1:amd64                                  0.40.0-3                                amd64        simple configuration storage system - runtime library
ii  libde265-0:amd64                                 1.0.8-1                                 amd64        Open H.265 video codec implementation
ii  libdebconfclient0:amd64                          0.261ubuntu1                            amd64        Debian Configuration Management System (C-implementation library)
ii  libdecor-0-0:amd64                               0.1.0-3build1                           amd64        client-side window decoration library
ii  libdecor-0-plugin-1-cairo:amd64                  0.1.0-3build1                           amd64        default decoration plugin
ii  libdee-1.0-4:amd64                               1.2.7+17.10.20170616-6ubuntu4           amd64        Model to synchronize multiple instances over DBus - shared lib
ii  libdeflate0:amd64                                1.10-2                                  amd64        fast, whole-buffer DEFLATE-based compression and decompression
ii  libdevmapper1.02.1:amd64                         2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  libdjvulibre-text                                3.5.28-2build2                          all          Linguistic support files for libdjvulibre
ii  libdjvulibre21:amd64                             3.5.28-2build2                          amd64        Runtime support for the DjVu image format
ii  libdns-export1110                                1:9.11.19+dfsg-2.1ubuntu3               amd64        Exported DNS Shared Library
ii  libdpkg-perl                                     1.21.1ubuntu2.1                         all          Dpkg perl modules
ii  libdrm-amdgpu1:amd64                             2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to amdgpu-specific kernel DRM services -- runtime
ii  libdrm-common                                    2.4.113-2~ubuntu0.22.04.1               all          Userspace interface to kernel DRM services -- common files
ii  libdrm-dev:amd64                                 2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to kernel DRM services -- development files
ii  libdrm-intel1:amd64                              2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to intel-specific kernel DRM services -- runtime
ii  libdrm-nouveau2:amd64                            2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to nouveau-specific kernel DRM services -- runtime
ii  libdrm-radeon1:amd64                             2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to radeon-specific kernel DRM services -- runtime
ii  libdrm2:amd64                                    2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to kernel DRM services -- runtime
ii  libdv4:amd64                                     1.0.0-14build1                          amd64        software library for DV format digital video (runtime lib)
ii  libdw-dev:amd64                                  0.186-1build1                           amd64        libdw1 development libraries and header files
ii  libdw1:amd64                                     0.186-1build1                           amd64        library that provides access to the DWARF debug information
ii  libedit2:amd64                                   3.1-20210910-1build1                    amd64        BSD editline and history libraries
ii  libegl-dev:amd64                                 1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- EGL development files
ii  libegl-mesa0:amd64                               22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the EGL API -- Mesa vendor library
ii  libegl1:amd64                                    1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- EGL support
ii  libelf-dev:amd64                                 0.186-1build1                           amd64        libelf1 development libraries and header files
ii  libelf1:amd64                                    0.186-1build1                           amd64        library to read and write ELF files
ii  libepoxy0:amd64                                  1.5.10-1                                amd64        OpenGL function pointer management library
ii  liberror-perl                                    0.17029-1                               all          Perl module for error/exception handling in an OO-ish way
ii  libestr0:amd64                                   0.1.10-2.1build3                        amd64        Helper functions for handling strings (lib)
ii  libevent-core-2.1-7:amd64                        2.1.12-stable-1build3                   amd64        Asynchronous event notification library (core)
ii  libexempi8:amd64                                 2.5.2-1ubuntu0.22.04.1                  amd64        library to parse XMP metadata (Library)
ii  libexif12:amd64                                  0.6.24-1build1                          amd64        library to parse EXIF files
ii  libexiv2-27:amd64                                0.27.5-3ubuntu1                         amd64        EXIF/IPTC/XMP metadata manipulation library
ii  libexpat1:amd64                                  2.4.7-1ubuntu0.2                        amd64        XML parsing C library - runtime library
ii  libexpat1-dev:amd64                              2.4.7-1ubuntu0.2                        amd64        XML parsing C library - development kit
ii  libext2fs2:amd64                                 1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system libraries
ii  libfakeroot:amd64                                1.28-1ubuntu1                           amd64        tool for simulating superuser privileges - shared libraries
ii  libfastjson4:amd64                               0.99.9-1build2                          amd64        fast json library for C
ii  libfdisk1:amd64                                  2.37.2-4ubuntu3                         amd64        fdisk partitioning library
ii  libffi-dev:amd64                                 3.4.2-4                                 amd64        Foreign Function Interface library (development files)
ii  libffi8:amd64                                    3.4.2-4                                 amd64        Foreign Function Interface library runtime
ii  libfftw3-double3:amd64                           3.3.8-2ubuntu8                          amd64        Library for computing Fast Fourier Transforms - Double precision
ii  libfftw3-single3:amd64                           3.3.8-2ubuntu8                          amd64        Library for computing Fast Fourier Transforms - Single precision
ii  libfido2-1:amd64                                 1.10.0-1                                amd64        library for generating and verifying FIDO 2.0 objects
ii  libfile-fcntllock-perl                           0.22-3build7                            amd64        Perl module for file locking with fcntl(2)
ii  libfl-dev:amd64                                  2.6.4-8build2                           amd64        static library for flex (a fast lexical analyzer generator)
ii  libfl2:amd64                                     2.6.4-8build2                           amd64        SHARED library for flex (a fast lexical analyzer generator)
ii  libflac8:amd64                                   1.3.3-2ubuntu0.1                        amd64        Free Lossless Audio Codec - runtime C library
ii  libflite1:amd64                                  2.2-3                                   amd64        Small run-time speech synthesis engine - shared libraries
ii  libfontconfig-dev:amd64                          2.13.1-4.2ubuntu5                       amd64        generic font configuration library - development
ii  libfontconfig1:amd64                             2.13.1-4.2ubuntu5                       amd64        generic font configuration library - runtime
ii  libfontconfig1-dev:amd64                         2.13.1-4.2ubuntu5                       amd64        generic font configuration library - dummy package
ii  libfreetype-dev:amd64                            2.11.1+dfsg-1ubuntu0.1                  amd64        FreeType 2 font engine, development files
ii  libfreetype6:amd64                               2.11.1+dfsg-1ubuntu0.1                  amd64        FreeType 2 font engine, shared library files
ii  libfreetype6-dev:amd64                           2.11.1+dfsg-1ubuntu0.1                  amd64        FreeType 2 font engine, development files (transitional package)
ii  libfribidi0:amd64                                1.0.8-2ubuntu3.1                        amd64        Free Implementation of the Unicode BiDi algorithm
ii  libfuse3-3:amd64                                 3.10.5-1build1                          amd64        Filesystem in Userspace (library) (3.x version)
ii  libgbm-dev:amd64                                 22.2.5-0ubuntu0.1~22.04.1               amd64        generic buffer management API -- development files
ii  libgbm1:amd64                                    22.2.5-0ubuntu0.1~22.04.1               amd64        generic buffer management API -- runtime
ii  libgc1:amd64                                     1:8.0.6-1.1build1                       amd64        conservative garbage collector for C and C++
ii  libgcc-11-dev:amd64                              11.3.0-1ubuntu1~22.04                   amd64        GCC support library (development files)
ii  libgcc-s1:amd64                                  12.1.0-2ubuntu1~22.04                   amd64        GCC support library
ii  libgck-1-0:amd64                                 3.40.0-4                                amd64        Glib wrapper library for PKCS#11 - runtime
ii  libgcr-base-3-1:amd64                            3.40.0-4                                amd64        Library for Crypto related tasks
ii  libgcr-ui-3-1:amd64                              3.40.0-4                                amd64        Library for Crypto UI related tasks
ii  libgcrypt20:amd64                                1.9.4-3ubuntu3                          amd64        LGPL Crypto library - runtime library
ii  libgd3:amd64                                     2.3.0-2ubuntu2                          amd64        GD Graphics Library
ii  libgdata-common                                  0.18.1-2build1                          all          Library for accessing GData webservices - common data files
ii  libgdata22:amd64                                 0.18.1-2build1                          amd64        Library for accessing GData webservices - shared libraries
ii  libgdbm-compat4:amd64                            1.23-1                                  amd64        GNU dbm database routines (legacy support runtime version)
ii  libgdbm6:amd64                                   1.23-1                                  amd64        GNU dbm database routines (runtime version)
ii  libgdk-pixbuf-2.0-0:amd64                        2.42.8+dfsg-1ubuntu0.2                  amd64        GDK Pixbuf library
ii  libgdk-pixbuf2.0-bin                             2.42.8+dfsg-1ubuntu0.2                  amd64        GDK Pixbuf library (thumbnailer)
ii  libgdk-pixbuf2.0-common                          2.42.8+dfsg-1ubuntu0.2                  all          GDK Pixbuf library - data files
ii  libgexiv2-2:amd64                                0.14.0-1build1                          amd64        GObject-based wrapper around the Exiv2 library
ii  libgfortran5:amd64                               12.1.0-2ubuntu1~22.04                   amd64        Runtime library for GNU Fortran applications
ii  libgif7:amd64                                    5.1.9-2build2                           amd64        library for GIF images (library)
ii  libgirepository-1.0-1:amd64                      1.72.0-1                                amd64        Library for handling GObject introspection data (runtime library)
ii  libgirepository1.0-dev:amd64                     1.72.0-1                                amd64        Library for handling GObject introspection data (development files)
ii  libgl-dev:amd64                                  1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GL development files
ii  libgl1:amd64                                     1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- legacy GL support
ii  libgl1-amber-dri:amd64                           21.3.7-0ubuntu1                         amd64        free implementation of the OpenGL API -- DRI modules
ii  libgl1-mesa-dri:amd64                            22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the OpenGL API -- DRI modules
ii  libglapi-mesa:amd64                              22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the GL API -- shared library
ii  libgles-dev:amd64                                1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLES development files
ii  libgles1:amd64                                   1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLESv1 support
ii  libgles2:amd64                                   1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLESv2 support
ii  libglib2.0-0:amd64                               2.72.4-0ubuntu1                         amd64        GLib library of C routines
ii  libglib2.0-bin                                   2.72.4-0ubuntu1                         amd64        Programs for the GLib library
ii  libglib2.0-data                                  2.72.4-0ubuntu1                         all          Common files for GLib library
ii  libglib2.0-dev:amd64                             2.72.4-0ubuntu1                         amd64        Development files for the GLib library
ii  libglib2.0-dev-bin                               2.72.4-0ubuntu1                         amd64        Development utilities for the GLib library
ii  libglvnd0:amd64                                  1.4.0-1                                 amd64        Vendor neutral GL dispatch library
ii  libglx-dev:amd64                                 1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLX development files
ii  libglx-mesa0:amd64                               22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the OpenGL API -- GLX vendor library
ii  libglx0:amd64                                    1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLX support
ii  libgme0:amd64                                    0.6.3-2                                 amd64        Playback library for video game music files - shared library
ii  libgmp10:amd64                                   2:6.2.1+dfsg-3ubuntu1                   amd64        Multiprecision arithmetic library
ii  libgnome-autoar-0-0:amd64                        0.4.3-1                                 amd64        Archives integration support for GNOME
ii  libgnome-desktop-3-19:amd64                      42.5-0ubuntu1                           amd64        Utility library for the GNOME desktop - GTK 3 version
ii  libgnutls30:amd64                                3.7.3-4ubuntu1.2                        amd64        GNU TLS library - main runtime library
ii  libgoa-1.0-0b:amd64                              3.44.0-1ubuntu1                         amd64        library for GNOME Online Accounts
ii  libgoa-1.0-common                                3.44.0-1ubuntu1                         all          library for GNOME Online Accounts - common files
ii  libgomp1:amd64                                   12.1.0-2ubuntu1~22.04                   amd64        GCC OpenMP (GOMP) support library
ii  libgpg-error0:amd64                              1.43-3                                  amd64        GnuPG development runtime library
ii  libgpgme11:amd64                                 1.16.0-1.2ubuntu4                       amd64        GPGME - GnuPG Made Easy (library)
ii  libgphoto2-6:amd64                               2.5.27-1build2                          amd64        gphoto2 digital camera library
ii  libgphoto2-l10n                                  2.5.27-1build2                          all          gphoto2 digital camera library - localized messages
ii  libgphoto2-port12:amd64                          2.5.27-1build2                          amd64        gphoto2 digital camera port library
ii  libgpm2:amd64                                    1.20.7-10build1                         amd64        General Purpose Mouse - shared library
ii  libgraphene-1.0-0:amd64                          1.10.8-1                                amd64        library of graphic data types
ii  libgraphicsmagick-q16-3                          1.4+really1.3.38-1ubuntu0.1             amd64        format-independent image processing - C shared library
ii  libgraphite2-3:amd64                             1.3.14-1build2                          amd64        Font rendering engine for Complex Scripts -- library
ii  libgs9:amd64                                     9.55.0~dfsg1-0ubuntu5.2                 amd64        interpreter for the PostScript language and for PDF - Library
ii  libgs9-common                                    9.55.0~dfsg1-0ubuntu5.2                 all          interpreter for the PostScript language and for PDF - common files
ii  libgsasl7:amd64                                  1.10.0-5                                amd64        GNU SASL library
ii  libgsf-1-114:amd64                               1.14.47-1build2                         amd64        Structured File Library - runtime version
ii  libgsf-1-common                                  1.14.47-1build2                         all          Structured File Library - common files
ii  libgsm1:amd64                                    1.0.19-1                                amd64        Shared libraries for GSM speech compressor
ii  libgssapi-krb5-2:amd64                           1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries - krb5 GSS-API Mechanism
ii  libgstreamer-gl1.0-0:amd64                       1.20.1-1                                amd64        GStreamer GL libraries
ii  libgstreamer-plugins-base1.0-0:amd64             1.20.1-1                                amd64        GStreamer libraries from the "base" set
ii  libgstreamer-plugins-base1.0-dev:amd64           1.20.1-1                                amd64        GStreamer development files for libraries from the "base" set
ii  libgstreamer-plugins-good1.0-0:amd64             1.20.3-0ubuntu1                         amd64        GStreamer development files for libraries from the "good" set
ii  libgstreamer1.0-0:amd64                          1.20.3-0ubuntu1                         amd64        Core GStreamer libraries and elements
ii  libgstreamer1.0-dev:amd64                        1.20.3-0ubuntu1                         amd64        GStreamer core development files
ii  libgtk-3-0:amd64                                 3.24.33-1ubuntu2                        amd64        GTK graphical user interface library
ii  libgtk-3-bin                                     3.24.33-1ubuntu2                        amd64        programs for the GTK graphical user interface library
ii  libgtk-3-common                                  3.24.33-1ubuntu2                        all          common files for the GTK graphical user interface library
ii  libgudev-1.0-0:amd64                             1:237-2build1                           amd64        GObject-based wrapper library for libudev
ii  libgudev-1.0-dev:amd64                           1:237-2build1                           amd64        libgudev-1.0 development files
ii  libgxps2:amd64                                   0.3.2-2                                 amd64        handling and rendering XPS documents (library)
ii  libhandy-1-0:amd64                               1.6.1-1                                 amd64        Library with GTK widgets for mobile phones
ii  libharfbuzz0b:amd64                              2.7.4-1ubuntu3.1                        amd64        OpenType text shaping engine (shared library)
ii  libheif1:amd64                                   1.12.0-2build1                          amd64        ISO/IEC 23008-12:2017 HEIF file format decoder - shared library
ii  libhogweed6:amd64                                3.7.3-1build2                           amd64        low level cryptographic library (public-key cryptos)
ii  libice-dev:amd64                                 2:1.0.10-1build2                        amd64        X11 Inter-Client Exchange library (development headers)
ii  libice6:amd64                                    2:1.0.10-1build2                        amd64        X11 Inter-Client Exchange library
ii  libicu70:amd64                                   70.1-2                                  amd64        International Components for Unicode
ii  libidn12:amd64                                   1.38-4build1                            amd64        GNU Libidn library, implementation of IETF IDN specifications
ii  libidn2-0:amd64                                  2.3.2-2build1                           amd64        Internationalized domain names (IDNA2008/TR46) library
ii  libiec61883-0:amd64                              1.2.0-4build3                           amd64        partial implementation of IEC 61883 (shared lib)
ii  libigdgmm12:amd64                                22.1.2+ds1-1                            amd64        Intel Graphics Memory Management Library -- shared library
ii  libijs-0.35:amd64                                0.35-15build2                           amd64        IJS raster image transport protocol: shared library
ii  libilmbase25:amd64                               2.5.7-2                                 amd64        several utility libraries from ILM used by OpenEXR
ii  libimobiledevice6:amd64                          1.3.0-6build3                           amd64        Library for communicating with iPhone and other Apple devices
ii  libip4tc2:amd64                                  1.8.7-1ubuntu5                          amd64        netfilter libip4tc library
ii  libip6tc2:amd64                                  1.8.7-1ubuntu5                          amd64        netfilter libip6tc library
ii  libisc-export1105:amd64                          1:9.11.19+dfsg-2.1ubuntu3               amd64        Exported ISC Shared Library
ii  libisl23:amd64                                   0.24-2build1                            amd64        manipulating sets and relations of integer points bounded by linear constraints
ii  libitm1:amd64                                    12.1.0-2ubuntu1~22.04                   amd64        GNU Transactional Memory Library
ii  libjack-dev                                      1:0.125.0-3build2                       amd64        JACK Audio Connection Kit (development files)
ii  libjack0:amd64                                   1:0.125.0-3build2                       amd64        JACK Audio Connection Kit (libraries)
ii  libjansson4:amd64                                2.13.1-1.1build3                        amd64        C library for encoding, decoding and manipulating JSON data
ii  libjbig0:amd64                                   2.1-3.1ubuntu0.22.04.1                  amd64        JBIGkit libraries
ii  libjbig2dec0:amd64                               0.19-3build2                            amd64        JBIG2 decoder library - shared libraries
ii  libjpeg-turbo8:amd64                             2.1.2-0ubuntu1                          amd64        IJG JPEG compliant runtime library.
ii  libjpeg8:amd64                                   8c-2ubuntu10                            amd64        Independent JPEG Group's JPEG runtime library (dependency package)
ii  libjs-jquery                                     3.6.0+dfsg+~3.5.13-1                    all          JavaScript library for dynamic web applications
ii  libjs-sphinxdoc                                  4.3.2-1                                 all          JavaScript support for Sphinx documentation
ii  libjs-underscore                                 1.13.2~dfsg-2                           all          JavaScript's functional programming helper library
ii  libjson-c5:amd64                                 0.15-3~ubuntu1.22.04.1                  amd64        JSON manipulation library - shared library
ii  libjson-glib-1.0-0:amd64                         1.6.6-1build1                           amd64        GLib JSON manipulation library
ii  libjson-glib-1.0-common                          1.6.6-1build1                           all          GLib JSON manipulation library (common files)
ii  libjxr-tools                                     1.2~git20170615.f752187-5               amd64        JPEG-XR lib - command line apps
ii  libjxr0:amd64                                    1.2~git20170615.f752187-5               amd64        JPEG-XR lib - libraries
ii  libk5crypto3:amd64                               1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries - Crypto Library
ii  libkeyutils1:amd64                               1.6.1-2ubuntu3                          amd64        Linux Key Management Utilities (library)
ii  libkmod2:amd64                                   29-1ubuntu1                             amd64        libkmod shared library
ii  libkrb5-3:amd64                                  1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries
ii  libkrb5support0:amd64                            1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries - Support library
ii  libksba8:amd64                                   1.6.0-2ubuntu0.2                        amd64        X.509 and CMS support library
ii  liblapack3:amd64                                 3.10.0-2ubuntu1                         amd64        Library of linear algebra routines 3 - shared version
ii  liblcms2-2:amd64                                 2.12~rc1-2build2                        amd64        Little CMS 2 color management library
ii  libldap-2.5-0:amd64                              2.5.14+dfsg-0ubuntu0.22.04.2            amd64        OpenLDAP libraries
ii  libldap-common                                   2.5.14+dfsg-0ubuntu0.22.04.2            all          OpenLDAP common files for libraries
ii  libldb2:amd64                                    2:2.4.4-0ubuntu0.22.04.2                amd64        LDAP-like embedded database - shared library
ii  liblilv-0-0:amd64                                0.24.12-2                               amd64        library for simple use of LV2 plugins
ii  libllvm15:amd64                                  1:15.0.7-0ubuntu0.22.04.1               amd64        Modular compiler and toolchain technologies, runtime library
ii  liblmdb0:amd64                                   0.9.24-1build2                          amd64        Lightning Memory-Mapped Database shared library
ii  liblocale-gettext-perl                           1.07-4build3                            amd64        module using libc functions for internationalization in Perl
ii  liblqr-1-0:amd64                                 0.4.2-2.1                               amd64        converts plain array images into multi-size representation
ii  liblsan0:amd64                                   12.1.0-2ubuntu1~22.04                   amd64        LeakSanitizer -- a memory leak detector (runtime)
ii  libltdl7:amd64                                   2.4.6-15build2                          amd64        System independent dlopen wrapper for GNU libtool
ii  liblz4-1:amd64                                   1.9.3-2build2                           amd64        Fast LZ compression algorithm library - runtime
ii  liblzma-dev:amd64                                5.2.5-2ubuntu1                          amd64        XZ-format compression library - development files
ii  liblzma5:amd64                                   5.2.5-2ubuntu1                          amd64        XZ-format compression library
ii  liblzo2-2:amd64                                  2.10-2build3                            amd64        data compression library
ii  libmagic-mgc                                     1:5.41-3                                amd64        File type determination library using "magic" numbers (compiled magic file)
ii  libmagic1:amd64                                  1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers - library
ii  libmagickcore-6.q16-6:amd64                      8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library -- quantum depth Q16
ii  libmagickcore-6.q16-6-extra:amd64                8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library - extra codecs (Q16)
ii  libmagickcore-6.q16hdri-6:amd64                  8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library -- quantum depth Q16HDRI
ii  libmagickcore-6.q16hdri-6-extra:amd64            8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library - extra codecs (Q16HDRI)
ii  libmagickwand-6.q16-6:amd64                      8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation library -- quantum depth Q16
ii  libmagickwand-6.q16hdri-6:amd64                  8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation library -- quantum depth Q16HDRI
ii  libmailutils8:amd64                              1:3.14-1                                amd64        GNU Mail abstraction library
ii  libmaxminddb0:amd64                              1.5.2-1build2                           amd64        IP geolocation database library
ii  libmd0:amd64                                     1.0.4-1build1                           amd64        message digest functions from BSD systems - shared library
ii  libmfx1:amd64                                    22.3.0-1                                amd64        Intel Media SDK -- shared library
ii  libmnl0:amd64                                    1.0.4-3build2                           amd64        minimalistic Netlink communication library
ii  libmount-dev:amd64                               2.37.2-4ubuntu3                         amd64        device mounting library - headers
ii  libmount1:amd64                                  2.37.2-4ubuntu3                         amd64        device mounting library
ii  libmp3lame0:amd64                                3.100-3build2                           amd64        MP3 encoding library
ii  libmpc3:amd64                                    1.2.1-2build1                           amd64        multiple precision complex floating-point library
ii  libmpdec3:amd64                                  2.5.1-2build2                           amd64        library for decimal floating point arithmetic (runtime library)
ii  libmpfr6:amd64                                   4.1.0-3build3                           amd64        multiple precision floating-point computation
ii  libmpg123-0:amd64                                1.29.3-1build1                          amd64        MPEG layer 1/2/3 audio decoder (shared library)
ii  libmtp-common                                    1.1.19-1build1                          all          Media Transfer Protocol (MTP) common files
ii  libmtp-runtime                                   1.1.19-1build1                          amd64        Media Transfer Protocol (MTP) runtime tools
ii  libmtp9:amd64                                    1.1.19-1build1                          amd64        Media Transfer Protocol (MTP) library
ii  libmysofa1:amd64                                 1.2.1~dfsg0-1                           amd64        library to read HRTFs stored in the AES69-2015 SOFA format
ii  libmysqlclient21:amd64                           8.0.32-0ubuntu0.22.04.2                 amd64        MySQL database client library
ii  libnautilus-extension1a:amd64                    1:42.2-0ubuntu2.1                       amd64        libraries for nautilus components - runtime version
ii  libncurses6:amd64                                6.3-2                                   amd64        shared libraries for terminal handling
ii  libncursesw6:amd64                               6.3-2                                   amd64        shared libraries for terminal handling (wide character support)
ii  libnetfilter-conntrack3:amd64                    1.0.9-1                                 amd64        Netfilter netlink-conntrack library
ii  libnetpbm10                                      2:10.0-15.4                             amd64        Graphics conversion tools shared libraries
ii  libnetplan0:amd64                                0.105-0ubuntu2~22.04.3                  amd64        YAML network configuration abstraction runtime library
ii  libnettle8:amd64                                 3.7.3-1build2                           amd64        low level cryptographic library (symmetric and one-way cryptos)
ii  libnewt0.52:amd64                                0.52.21-5ubuntu2                        amd64        Not Erik's Windowing Toolkit - text mode windowing with slang
ii  libnfnetlink0:amd64                              1.0.1-3build3                           amd64        Netfilter netlink library
ii  libnfs13:amd64                                   4.0.0-1build2                           amd64        NFS client library (shared library)
ii  libnftables1:amd64                               1.0.2-1ubuntu3                          amd64        Netfilter nftables high level userspace API library
ii  libnftnl11:amd64                                 1.2.1-1build1                           amd64        Netfilter nftables userspace API library
ii  libnghttp2-14:amd64                              1.43.0-1build3                          amd64        library implementing HTTP/2 protocol (shared library)
ii  libnl-3-200:amd64                                3.5.0-0.1                               amd64        library for dealing with netlink sockets
ii  libnl-genl-3-200:amd64                           3.5.0-0.1                               amd64        library for dealing with netlink sockets - generic netlink
ii  libnm0:amd64                                     1.36.6-0ubuntu2                         amd64        GObject-based client library for NetworkManager
ii  libnorm1:amd64                                   1.5.9+dfsg-2                            amd64        NACK-Oriented Reliable Multicast (NORM) library
ii  libnpth0:amd64                                   1.6-3build2                             amd64        replacement for GNU Pth using system threads
ii  libnsl-dev:amd64                                 1.3.0-2build2                           amd64        libnsl development files
ii  libnsl2:amd64                                    1.3.0-2build2                           amd64        Public client interface for NIS(YP) and NIS+
ii  libnspr4:amd64                                   2:4.32-3build1                          amd64        NetScape Portable Runtime Library
ii  libnss-systemd:amd64                             249.11-0ubuntu3.9                       amd64        nss module providing dynamic user and group name resolution
ii  libnss3:amd64                                    2:3.68.2-0ubuntu1.2                     amd64        Network Security Service libraries
ii  libntfs-3g89                                     1:2021.8.22-3ubuntu1.2                  amd64        read/write NTFS driver for FUSE (runtime library)
ii  libntlm0:amd64                                   1.6-4                                   amd64        NTLM authentication library
ii  libnuma1:amd64                                   2.0.14-3ubuntu2                         amd64        Libraries for controlling NUMA policy
ii  libogg0:amd64                                    1.3.5-0ubuntu3                          amd64        Ogg bitstream library
ii  libopenal-data                                   1:1.19.1-2build3                        all          Software implementation of the OpenAL audio API (data files)
ii  libopenal1:amd64                                 1:1.19.1-2build3                        amd64        Software implementation of the OpenAL audio API (shared library)
ii  libopenexr25:amd64                               2.5.7-1                                 amd64        runtime files for the OpenEXR image library
ii  libopenjp2-7:amd64                               2.4.0-6                                 amd64        JPEG 2000 image compression/decompression library
ii  libopenmpt0:amd64                                0.6.1-1                                 amd64        module music library based on OpenMPT -- shared library
ii  libopus0:amd64                                   1.3.1-0.1build2                         amd64        Opus codec runtime library
ii  liborc-0.4-0:amd64                               1:0.4.32-2                              amd64        Library of Optimized Inner Loops Runtime Compiler
ii  liborc-0.4-dev:amd64                             1:0.4.32-2                              amd64        Library of Optimized Inner Loops Runtime Compiler (development headers)
ii  liborc-0.4-dev-bin                               1:0.4.32-2                              amd64        Library of Optimized Inner Loops Runtime Compiler (development tools)
ii  libostree-1-1:amd64                              2022.2-3                                amd64        content-addressed filesystem for operating system binaries (library)
ii  libp11-kit0:amd64                                0.24.0-6build1                          amd64        library for loading and coordinating access to PKCS#11 modules - runtime
ii  libpackagekit-glib2-18:amd64                     1.2.5-2ubuntu2                          amd64        Library for accessing PackageKit using GLib
ii  libpam-cap:amd64                                 1:2.44-1build3                          amd64        POSIX 1003.1e capabilities (PAM module)
ii  libpam-gnome-keyring:amd64                       40.0-3ubuntu3                           amd64        PAM module to unlock the GNOME keyring upon login
ii  libpam-modules:amd64                             1.4.0-11ubuntu2.3                       amd64        Pluggable Authentication Modules for PAM
ii  libpam-modules-bin                               1.4.0-11ubuntu2.3                       amd64        Pluggable Authentication Modules for PAM - helper binaries
ii  libpam-runtime                                   1.4.0-11ubuntu2.3                       all          Runtime support for the PAM library
ii  libpam-systemd:amd64                             249.11-0ubuntu3.9                       amd64        system and service manager - PAM module
ii  libpam0g:amd64                                   1.4.0-11ubuntu2.3                       amd64        Pluggable Authentication Modules library
ii  libpango-1.0-0:amd64                             1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpangocairo-1.0-0:amd64                        1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpangoft2-1.0-0:amd64                          1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpangoxft-1.0-0:amd64                          1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpaper-utils                                   1.1.28build2                            amd64        library for handling paper characteristics (utilities)
ii  libpaper1:amd64                                  1.1.28build2                            amd64        library for handling paper characteristics
ii  libparted-fs-resize0:amd64                       3.4-2build1                             amd64        disk partition manipulator - shared FS resizing library
ii  libparted2:amd64                                 3.4-2build1                             amd64        disk partition manipulator - shared library
ii  libpcap0.8:amd64                                 1.10.1-4build1                          amd64        system interface for user-level packet capture
ii  libpci3:amd64                                    1:3.7.0-6                               amd64        PCI utilities (shared library)
ii  libpciaccess-dev:amd64                           0.16-3                                  amd64        Generic PCI access library for X - development files
ii  libpciaccess0:amd64                              0.16-3                                  amd64        Generic PCI access library for X
ii  libpcre16-3:amd64                                2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - 16 bit runtime files
ii  libpcre2-16-0:amd64                              10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - 16 bit runtime files
ii  libpcre2-32-0:amd64                              10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - 32 bit runtime files
ii  libpcre2-8-0:amd64                               10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library- 8 bit runtime files
ii  libpcre2-dev:amd64                               10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - development files
ii  libpcre2-posix3:amd64                            10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - posix-compatible runtime files
ii  libpcre3:amd64                                   2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - runtime files
ii  libpcre3-dev:amd64                               2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - development files
ii  libpcre32-3:amd64                                2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - 32 bit runtime files
ii  libpcrecpp0v5:amd64                              2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - C++ runtime files
ii  libperl5.34:amd64                                5.34.0-3ubuntu1.1                       amd64        shared Perl library
ii  libpgm-5.3-0:amd64                               5.3.128~dfsg-2                          amd64        OpenPGM shared library
ii  libpipeline1:amd64                               1.5.5-1                                 amd64        Unix process pipeline manipulation library
ii  libpixman-1-0:amd64                              0.40.0-1ubuntu0.22.04.1                 amd64        pixel-manipulation library for X and cairo
ii  libpixman-1-dev:amd64                            0.40.0-1ubuntu0.22.04.1                 amd64        pixel-manipulation library for X and cairo (development files)
ii  libplist3:amd64                                  2.2.0-6build2                           amd64        Library for handling Apple binary and XML property lists
ii  libplymouth5:amd64                               0.9.5+git20211018-1ubuntu3              amd64        graphical boot animation and logger - shared libraries
ii  libpng-dev:amd64                                 1.6.37-3build5                          amd64        PNG library - development (version 1.6)
ii  libpng-tools                                     1.6.37-3build5                          amd64        PNG library - tools (version 1.6)
ii  libpng16-16:amd64                                1.6.37-3build5                          amd64        PNG library - runtime (version 1.6)
ii  libpocketsphinx3:amd64                           0.8.0+real5prealpha+1-14ubuntu1         amd64        Speech recognition tool - front-end library
ii  libpolkit-agent-1-0:amd64                        0.105-33                                amd64        PolicyKit Authentication Agent API
ii  libpolkit-gobject-1-0:amd64                      0.105-33                                amd64        PolicyKit Authorization API
ii  libpoppler-glib8:amd64                           22.02.0-2ubuntu0.1                      amd64        PDF rendering library (GLib-based shared library)
ii  libpoppler118:amd64                              22.02.0-2ubuntu0.1                      amd64        PDF rendering library
ii  libpopt0:amd64                                   1.18-3build1                            amd64        lib for parsing cmdline parameters
ii  libportaudio2:amd64                              19.6.0-1.1                              amd64        Portable audio I/O - shared library
ii  libportaudiocpp0:amd64                           19.6.0-1.1                              amd64        Portable audio I/O C++ bindings - shared library
ii  libpostproc55:amd64                              7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for post processing - runtime files
ii  libpq5:amd64                                     14.7-0ubuntu0.22.04.1                   amd64        PostgreSQL C client library
ii  libprocps8:amd64                                 2:3.3.17-6ubuntu2                       amd64        library for accessing process information from /proc
ii  libproxy1v5:amd64                                0.4.17-2                                amd64        automatic proxy configuration management library (shared)
ii  libpsl5:amd64                                    0.21.0-1.2build2                        amd64        Library for Public Suffix List (shared libraries)
ii  libpthread-stubs0-dev:amd64                      0.4-1build2                             amd64        pthread stubs not provided by native libc, development files
ii  libpulse0:amd64                                  1:15.99.1+dfsg1-1ubuntu2.1              amd64        PulseAudio client libraries
ii  libpython3-dev:amd64                             3.10.6-1~22.04                          amd64        header files and a static library for Python (default)
ii  libpython3-stdlib:amd64                          3.10.6-1~22.04                          amd64        interactive high-level object-oriented language (default python3 version)
ii  libpython3.10:amd64                              3.10.6-1~22.04.2ubuntu1                 amd64        Shared Python runtime library (version 3.10)
ii  libpython3.10-dev:amd64                          3.10.6-1~22.04.2ubuntu1                 amd64        Header files and a static library for Python (v3.10)
ii  libpython3.10-minimal:amd64                      3.10.6-1~22.04.2ubuntu1                 amd64        Minimal subset of the Python language (version 3.10)
ii  libpython3.10-stdlib:amd64                       3.10.6-1~22.04.2ubuntu1                 amd64        Interactive high-level object-oriented language (standard library, version 3.10)
ii  libquadmath0:amd64                               12.1.0-2ubuntu1~22.04                   amd64        GCC Quad-Precision Math Library
ii  librabbitmq4:amd64                               0.10.0-1ubuntu2                         amd64        AMQP client library written in C
ii  libraw1394-11:amd64                              2.1.2-2build2                           amd64        library for direct access to IEEE 1394 bus (aka FireWire)
ii  libreadline8:amd64                               8.1.2-1                                 amd64        GNU readline and history libraries, run-time libraries
ii  librsvg2-2:amd64                                 2.52.5+dfsg-3                           amd64        SAX-based renderer library for SVG files (runtime)
ii  librsvg2-common:amd64                            2.52.5+dfsg-3                           amd64        SAX-based renderer library for SVG files (extra runtime)
ii  librtmp1:amd64                                   2.4+20151223.gitfa8646d.1-2build4       amd64        toolkit for RTMP streams (shared library)
ii  librubberband2:amd64                             2.0.0-2                                 amd64        audio time-stretching and pitch-shifting library
ii  libsamplerate0:amd64                             0.2.2-1build1                           amd64        Audio sample rate conversion library
ii  libsasl2-2:amd64                                 2.1.27+dfsg2-3ubuntu1.2                 amd64        Cyrus SASL - authentication abstraction library
ii  libsasl2-modules:amd64                           2.1.27+dfsg2-3ubuntu1.2                 amd64        Cyrus SASL - pluggable authentication modules
ii  libsasl2-modules-db:amd64                        2.1.27+dfsg2-3ubuntu1.2                 amd64        Cyrus SASL - pluggable authentication modules (DB)
ii  libsdl2-2.0-0:amd64                              2.0.20+dfsg-2ubuntu1.22.04.1            amd64        Simple DirectMedia Layer
ii  libseccomp2:amd64                                2.5.3-2ubuntu2                          amd64        high level interface to Linux seccomp filter
ii  libsecret-1-0:amd64                              0.20.5-2                                amd64        Secret store
ii  libsecret-common                                 0.20.5-2                                all          Secret store (common files)
ii  libselinux1:amd64                                3.3-1build2                             amd64        SELinux runtime shared libraries
ii  libselinux1-dev:amd64                            3.3-1build2                             amd64        SELinux development headers
ii  libsemanage-common                               3.3-1build2                             all          Common files for SELinux policy management libraries
ii  libsemanage2:amd64                               3.3-1build2                             amd64        SELinux policy management library
ii  libsensors-config                                1:3.6.0-7ubuntu1                        all          lm-sensors configuration files
ii  libsensors5:amd64                                1:3.6.0-7ubuntu1                        amd64        library to read temperature/voltage/fan sensors
ii  libsepol-dev:amd64                               3.3-1build1                             amd64        SELinux binary policy manipulation library and development files
ii  libsepol2:amd64                                  3.3-1build1                             amd64        SELinux library for manipulating binary security policies
ii  libserd-0-0:amd64                                0.30.10-2                               amd64        lightweight RDF syntax library
ii  libshine3:amd64                                  3.1.1-2                                 amd64        Fixed-point MP3 encoding library - runtime files
ii  libshout3:amd64                                  2.4.5-1build3                           amd64        MP3/Ogg Vorbis broadcast streaming library
ii  libsigsegv2:amd64                                2.13-1ubuntu3                           amd64        Library for handling page faults in a portable way
ii  libslang2:amd64                                  2.3.2-5build4                           amd64        S-Lang programming library - runtime version
ii  libslirp0:amd64                                  4.6.1-1build1                           amd64        General purpose TCP-IP emulator library
ii  libsm-dev:amd64                                  2:1.2.3-1build2                         amd64        X11 Session Management library (development headers)
ii  libsm6:amd64                                     2:1.2.3-1build2                         amd64        X11 Session Management library
ii  libsmartcols1:amd64                              2.37.2-4ubuntu3                         amd64        smart column output alignment library
ii  libsmbclient:amd64                               2:4.15.13+dfsg-0ubuntu1.1               amd64        shared library for communication with SMB/CIFS servers
ii  libsnappy1v5:amd64                               1.1.8-1build3                           amd64        fast compression/decompression library
ii  libsndfile1:amd64                                1.0.31-2build1                          amd64        Library for reading/writing audio files
ii  libsndio7.0:amd64                                1.8.1-1.1                               amd64        Small audio and MIDI framework from OpenBSD, runtime libraries
ii  libsodium23:amd64                                1.0.18-1build2                          amd64        Network communication, cryptography and signaturing library
ii  libsord-0-0:amd64                                0.16.8-2                                amd64        library for storing RDF data in memory
ii  libsoup2.4-1:amd64                               2.74.2-3                                amd64        HTTP library implementation in C -- Shared library
ii  libsoup2.4-common                                2.74.2-3                                all          HTTP library implementation in C -- Common files
ii  libsoxr0:amd64                                   0.1.3-4build2                           amd64        High quality 1D sample-rate conversion library
ii  libspeex1:amd64                                  1.2~rc1.2-1.1ubuntu3                    amd64        The Speex codec runtime library
ii  libsphinxbase3:amd64                             0.8+5prealpha+1-13build1                amd64        Speech recognition tool - shared library
ii  libsqlite3-0:amd64                               3.37.2-2ubuntu0.1                       amd64        SQLite 3 shared library
ii  libsratom-0-0:amd64                              0.6.8-1                                 amd64        library for serialising LV2 atoms to/from Turtle
ii  libsrt1.4-gnutls:amd64                           1.4.4-4                                 amd64        Secure Reliable Transport UDP streaming library (GnuTLS flavour)
ii  libss2:amd64                                     1.46.5-2ubuntu1.1                       amd64        command-line interface parsing library
ii  libssh-4:amd64                                   0.9.6-2build1                           amd64        tiny C SSH library (OpenSSL flavor)
ii  libssh-gcrypt-4:amd64                            0.9.6-2build1                           amd64        tiny C SSH library (gcrypt flavor)
ii  libssl3:amd64                                    3.0.2-0ubuntu1.8                        amd64        Secure Sockets Layer toolkit - shared libraries
ii  libstdc++-11-dev:amd64                           11.3.0-1ubuntu1~22.04                   amd64        GNU Standard C++ Library v3 (development files)
ii  libstdc++6:amd64                                 12.1.0-2ubuntu1~22.04                   amd64        GNU Standard C++ Library v3
ii  libstemmer0d:amd64                               2.2.0-1build1                           amd64        Snowball stemming algorithms for use in Information Retrieval
ii  libswresample3:amd64                             7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for audio resampling, rematrixing etc. - runtime files
ii  libswscale5:amd64                                7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for image scaling and various conversions - runtime files
ii  libsystemd0:amd64                                249.11-0ubuntu3.9                       amd64        systemd utility library
ii  libtag1v5:amd64                                  1.11.1+dfsg.1-3ubuntu3                  amd64        audio meta-data library
ii  libtag1v5-vanilla:amd64                          1.11.1+dfsg.1-3ubuntu3                  amd64        audio meta-data library - vanilla flavour
ii  libtalloc2:amd64                                 2.3.3-2build1                           amd64        hierarchical pool based memory allocator
ii  libtasn1-6:amd64                                 4.18.0-4build1                          amd64        Manage ASN.1 structures (runtime)
ii  libtdb1:amd64                                    1.4.5-2build1                           amd64        Trivial Database - shared library
ii  libtevent0:amd64                                 0.11.0-1build1                          amd64        talloc-based event loop library - shared library
ii  libtext-charwidth-perl                           0.04-10build3                           amd64        get display widths of characters on the terminal
ii  libtext-iconv-perl                               1.7-7build3                             amd64        module to convert between character sets in Perl
ii  libtext-wrapi18n-perl                            0.06-9                                  all          internationalized substitute of Text::Wrap
ii  libthai-data                                     0.1.29-1build1                          all          Data files for Thai language support library
ii  libthai0:amd64                                   0.1.29-1build1                          amd64        Thai language support library
ii  libtheora0:amd64                                 1.1.1+dfsg.1-15ubuntu4                  amd64        Theora Video Compression Codec
ii  libtiff5:amd64                                   4.3.0-6ubuntu0.4                        amd64        Tag Image File Format (TIFF) library
ii  libtinfo6:amd64                                  6.3-2                                   amd64        shared low-level terminfo library for terminal handling
ii  libtirpc-common                                  1.3.2-2ubuntu0.1                        all          transport-independent RPC library - common files
ii  libtirpc-dev:amd64                               1.3.2-2ubuntu0.1                        amd64        transport-independent RPC library - development files
ii  libtirpc3:amd64                                  1.3.2-2ubuntu0.1                        amd64        transport-independent RPC library
ii  libtotem-plparser-common                         3.26.6-1build1                          all          Totem Playlist Parser library - common files
ii  libtotem-plparser18:amd64                        3.26.6-1build1                          amd64        Totem Playlist Parser library - runtime files
ii  libtracker-sparql-3.0-0:amd64                    3.3.0-1                                 amd64        metadata database, indexer and search tool - library
ii  libtsan0:amd64                                   11.3.0-1ubuntu1~22.04                   amd64        ThreadSanitizer -- a Valgrind-based detector of data races (runtime)
ii  libtwolame0:amd64                                0.4.0-2build2                           amd64        MPEG Audio Layer 2 encoding library
ii  libubsan1:amd64                                  12.1.0-2ubuntu1~22.04                   amd64        UBSan -- undefined behaviour sanitizer (runtime)
ii  libuchardet0:amd64                               0.0.7-1build2                           amd64        universal charset detection library - shared library
ii  libudev-dev:amd64                                249.11-0ubuntu3.9                       amd64        libudev development files
ii  libudev1:amd64                                   249.11-0ubuntu3.9                       amd64        libudev shared library
ii  libudfread0:amd64                                1.1.2-1                                 amd64        UDF reader library
ii  libudisks2-0:amd64                               2.9.4-1ubuntu2                          amd64        GObject based library to access udisks2
ii  libunistring2:amd64                              1.0-1                                   amd64        Unicode string library for C
ii  libunity-protocol-private0:amd64                 7.1.4+19.04.20190319-6build1            amd64        binding to get places into the launcher - private library
ii  libunity-scopes-json-def-desktop                 7.1.4+19.04.20190319-6build1            all          binding to get places into the launcher - desktop def file
ii  libunity9:amd64                                  7.1.4+19.04.20190319-6build1            amd64        binding to get places into the launcher - shared library
ii  libunwind-dev:amd64                              1.3.2-2build2                           amd64        library to determine the call-chain of a program - development
ii  libunwind8:amd64                                 1.3.2-2build2                           amd64        library to determine the call-chain of a program - runtime
ii  libupower-glib3:amd64                            0.99.17-1                               amd64        abstraction for power management - shared library
ii  libusb-1.0-0:amd64                               2:1.0.25-1ubuntu2                       amd64        userspace USB programming library
ii  libusbmuxd6:amd64                                2.0.2-3build2                           amd64        USB multiplexor daemon for iPhone and iPod Touch devices - library
ii  libutempter0:amd64                               1.2.1-2build2                           amd64        privileged helper for utmp/wtmp updates (runtime)
ii  libuuid1:amd64                                   2.37.2-4ubuntu3                         amd64        Universally Unique ID library
ii  libuv1:amd64                                     1.43.0-1                                amd64        asynchronous event notification library - runtime library
ii  libv4l-0:amd64                                   1.22.1-2build1                          amd64        Collection of video4linux support libraries
ii  libv4lconvert0:amd64                             1.22.1-2build1                          amd64        Video4linux frame format conversion library
ii  libva-drm2:amd64                                 2.14.0-1                                amd64        Video Acceleration (VA) API for Linux -- DRM runtime
ii  libva-x11-2:amd64                                2.14.0-1                                amd64        Video Acceleration (VA) API for Linux -- X11 runtime
ii  libva2:amd64                                     2.14.0-1                                amd64        Video Acceleration (VA) API for Linux -- runtime
ii  libvdpau1:amd64                                  1.4-3build2                             amd64        Video Decode and Presentation API for Unix (libraries)
ii  libvidstab1.1:amd64                              1.1.0-2                                 amd64        video stabilization library (shared library)
ii  libvisual-0.4-0:amd64                            0.4.0-17build2                          amd64        audio visualization framework
ii  libvolume-key1                                   0.3.12-3.1build3                        amd64        Library for manipulating storage encryption keys and passphrases
ii  libvorbis0a:amd64                                1.3.7-1build2                           amd64        decoder library for Vorbis General Audio Compression Codec
ii  libvorbisenc2:amd64                              1.3.7-1build2                           amd64        encoder library for Vorbis General Audio Compression Codec
ii  libvorbisfile3:amd64                             1.3.7-1build2                           amd64        high-level API for Vorbis General Audio Compression Codec
ii  libvpx7:amd64                                    1.11.0-2ubuntu2                         amd64        VP8 and VP9 video codec (shared library)
ii  libwavpack1:amd64                                5.4.0-1build2                           amd64        audio codec (lossy and lossless) - library
ii  libwayland-bin                                   1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - binary utilities
ii  libwayland-client0:amd64                         1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - client library
ii  libwayland-cursor0:amd64                         1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - cursor library
ii  libwayland-dev:amd64                             1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - development files
ii  libwayland-egl1:amd64                            1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - EGL library
ii  libwayland-server0:amd64                         1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - server library
ii  libwbclient0:amd64                               2:4.15.13+dfsg-0ubuntu1.1               amd64        Samba winbind client library
ii  libwebp7:amd64                                   1.2.2-2                                 amd64        Lossy compression of digital photographic images
ii  libwebpdemux2:amd64                              1.2.2-2                                 amd64        Lossy compression of digital photographic images.
ii  libwebpmux3:amd64                                1.2.2-2                                 amd64        Lossy compression of digital photographic images
ii  libwmflite-0.2-7:amd64                           0.2.12-5ubuntu1                         amd64        Windows metafile conversion lite library
ii  libx11-6:amd64                                   2:1.7.5-1                               amd64        X11 client-side library
ii  libx11-data                                      2:1.7.5-1                               all          X11 client-side library
ii  libx11-dev:amd64                                 2:1.7.5-1                               amd64        X11 client-side library (development headers)
ii  libx11-xcb-dev:amd64                             2:1.7.5-1                               amd64        Xlib/XCB interface library (development headers)
ii  libx11-xcb1:amd64                                2:1.7.5-1                               amd64        Xlib/XCB interface library
ii  libx264-163:amd64                                2:0.163.3060+git5db6aa6-2build1         amd64        x264 video coding library
ii  libx265-199:amd64                                3.5-2                                   amd64        H.265/HEVC video stream encoder (shared library)
ii  libx32asan6                                      11.3.0-1ubuntu1~22.04                   amd64        AddressSanitizer -- a fast memory error detector (x32)
ii  libx32atomic1                                    12.1.0-2ubuntu1~22.04                   amd64        support library providing __atomic built-in functions (x32)
ii  libx32gcc-11-dev                                 11.3.0-1ubuntu1~22.04                   amd64        GCC support library (x32 development files)
ii  libx32gcc-s1                                     12.1.0-2ubuntu1~22.04                   amd64        GCC support library (x32)
ii  libx32gomp1                                      12.1.0-2ubuntu1~22.04                   amd64        GCC OpenMP (GOMP) support library (x32)
ii  libx32itm1                                       12.1.0-2ubuntu1~22.04                   amd64        GNU Transactional Memory Library (x32)
ii  libx32quadmath0                                  12.1.0-2ubuntu1~22.04                   amd64        GCC Quad-Precision Math Library (x32)
ii  libx32stdc++6                                    12.1.0-2ubuntu1~22.04                   amd64        GNU Standard C++ Library v3 (x32)
ii  libx32ubsan1                                     12.1.0-2ubuntu1~22.04                   amd64        UBSan -- undefined behaviour sanitizer (x32)
ii  libxau-dev:amd64                                 1:1.0.9-1build5                         amd64        X11 authorisation library (development headers)
ii  libxau6:amd64                                    1:1.0.9-1build5                         amd64        X11 authorisation library
ii  libxcb-dri2-0:amd64                              1.14-3ubuntu3                           amd64        X C Binding, dri2 extension
ii  libxcb-dri3-0:amd64                              1.14-3ubuntu3                           amd64        X C Binding, dri3 extension
ii  libxcb-glx0:amd64                                1.14-3ubuntu3                           amd64        X C Binding, glx extension
ii  libxcb-present0:amd64                            1.14-3ubuntu3                           amd64        X C Binding, present extension
ii  libxcb-render0:amd64                             1.14-3ubuntu3                           amd64        X C Binding, render extension
ii  libxcb-render0-dev:amd64                         1.14-3ubuntu3                           amd64        X C Binding, render extension, development files
ii  libxcb-shape0:amd64                              1.14-3ubuntu3                           amd64        X C Binding, shape extension
ii  libxcb-shm0:amd64                                1.14-3ubuntu3                           amd64        X C Binding, shm extension
ii  libxcb-shm0-dev:amd64                            1.14-3ubuntu3                           amd64        X C Binding, shm extension, development files
ii  libxcb-sync1:amd64                               1.14-3ubuntu3                           amd64        X C Binding, sync extension
ii  libxcb-xfixes0:amd64                             1.14-3ubuntu3                           amd64        X C Binding, xfixes extension
ii  libxcb1:amd64                                    1.14-3ubuntu3                           amd64        X C Binding
ii  libxcb1-dev:amd64                                1.14-3ubuntu3                           amd64        X C Binding, development files
ii  libxcomposite1:amd64                             1:0.4.5-1build2                         amd64        X11 Composite extension library
ii  libxcursor1:amd64                                1:1.2.0-2build4                         amd64        X cursor management library
ii  libxdamage1:amd64                                1:1.1.5-2build2                         amd64        X11 damaged region extension library
ii  libxdmcp-dev:amd64                               1:1.1.3-0ubuntu5                        amd64        X11 authorisation library (development headers)
ii  libxdmcp6:amd64                                  1:1.1.3-0ubuntu5                        amd64        X11 Display Manager Control Protocol library
ii  libxext-dev:amd64                                2:1.3.4-1build1                         amd64        X11 miscellaneous extensions library (development headers)
ii  libxext6:amd64                                   2:1.3.4-1build1                         amd64        X11 miscellaneous extension library
ii  libxfixes3:amd64                                 1:6.0.0-1                               amd64        X11 miscellaneous 'fixes' extension library
ii  libxft2:amd64                                    2.3.4-1                                 amd64        FreeType-based font drawing library for X
ii  libxi6:amd64                                     2:1.8-1build1                           amd64        X11 Input extension library
ii  libxinerama1:amd64                               2:1.1.4-3                               amd64        X11 Xinerama extension library
ii  libxkbcommon0:amd64                              1.4.0-1                                 amd64        library interface to the XKB compiler - shared library
ii  libxkbregistry0:amd64                            1.4.0-1                                 amd64        library to query available RMLVO
ii  libxml2:amd64                                    2.9.13+dfsg-1ubuntu0.2                  amd64        GNOME XML library
ii  libxmlb2:amd64                                   0.3.6-2build1                           amd64        Binary XML library
ii  libxmuu1:amd64                                   2:1.1.3-3                               amd64        X11 miscellaneous micro-utility library
ii  libxpm4:amd64                                    1:3.5.12-1ubuntu0.22.04.1               amd64        X11 pixmap library
ii  libxrandr2:amd64                                 2:1.5.2-1build1                         amd64        X11 RandR extension library
ii  libxrender-dev:amd64                             1:0.9.10-1build4                        amd64        X Rendering Extension client library (development files)
ii  libxrender1:amd64                                1:0.9.10-1build4                        amd64        X Rendering Extension client library
ii  libxshmfence1:amd64                              1.3-1build4                             amd64        X shared memory fences - shared library
ii  libxss1:amd64                                    1:1.2.3-1build2                         amd64        X11 Screen Saver extension library
ii  libxtables12:amd64                               1.8.7-1ubuntu5                          amd64        netfilter xtables library
ii  libxtst6:amd64                                   2:1.2.3-1build4                         amd64        X11 Testing -- Record extension library
ii  libxv1:amd64                                     2:1.0.11-1build2                        amd64        X11 Video extension library
ii  libxvidcore4:amd64                               2:1.3.7-1                               amd64        Open source MPEG-4 video codec (library)
ii  libxxf86vm1:amd64                                1:1.1.4-1build3                         amd64        X11 XFree86 video mode extension library
ii  libxxhash0:amd64                                 0.8.1-1                                 amd64        shared library for xxhash
ii  libyaml-0-2:amd64                                0.2.2-1build2                           amd64        Fast YAML 1.1 parser and emitter library
ii  libzimg2:amd64                                   3.0.3+ds1-1                             amd64        scaling, colorspace, depth conversion library (shared library)
ii  libzmq5:amd64                                    4.3.4-2                                 amd64        lightweight messaging kernel (shared library)
ii  libzstd1:amd64                                   1.4.8+dfsg-3build1                      amd64        fast lossless compression algorithm
ii  libzvbi-common                                   0.2.35-19                               all          Vertical Blanking Interval decoder (VBI) - common files
ii  libzvbi0:amd64                                   0.2.35-19                               amd64        Vertical Blanking Interval decoder (VBI) - runtime files
ii  linux-libc-dev:amd64                             5.15.0-69.76                            amd64        Linux Kernel Headers for development
ii  locales                                          2.35-0ubuntu3.1                         all          GNU C Library: National Language (locale) data [support]
ii  login                                            1:4.8.1-2ubuntu2.1                      amd64        system login tools
ii  logrotate                                        3.19.0-1ubuntu1.1                       amd64        Log rotation utility
ii  logsave                                          1.46.5-2ubuntu1.1                       amd64        save the output of a command in a log file
ii  lsb-base                                         11.1.0ubuntu4                           all          Linux Standard Base init script functionality
ii  lsb-release                                      11.1.0ubuntu4                           all          Linux Standard Base version reporting utility
ii  lshw                                             02.19.git.2021.06.19.996aaad9c7-2build1 amd64        information about hardware configuration
ii  lsof                                             4.93.2+dfsg-1.1build2                   amd64        utility to list open files
ii  lto-disabled-list                                24                                      all          list of packages not to build with LTO
ii  m4                                               1.4.18-5ubuntu2                         amd64        macro processing language
ii  mailutils                                        1:3.14-1                                amd64        GNU mailutils utilities for handling mail
ii  mailutils-common                                 1:3.14-1                                all          common files for GNU mailutils
ii  make                                             4.3-4.1build1                           amd64        utility for directing compilation
ii  man-db                                           2.10.2-1                                amd64        tools for reading manual pages
ii  manpages                                         5.10-1ubuntu1                           all          Manual pages about using a GNU/Linux system
ii  manpages-dev                                     5.10-1ubuntu1                           all          Manual pages about using GNU/Linux for development
ii  mawk                                             1.3.4.20200120-3                        amd64        Pattern scanning and text processing language
ii  media-types                                      7.0.0                                   all          List of standard media types and their usual file extension
ii  mesa-va-drivers:amd64                            22.2.5-0ubuntu0.1~22.04.1               amd64        Mesa VA-API video acceleration drivers
ii  mesa-vdpau-drivers:amd64                         22.2.5-0ubuntu0.1~22.04.1               amd64        Mesa VDPAU video acceleration drivers
ii  motd-news-config                                 12ubuntu4.3                             all          Configuration for motd-news shipped in base-files
ii  mount                                            2.37.2-4ubuntu3                         amd64        tools for mounting and manipulating filesystems
ii  mtr-tiny                                         0.95-1                                  amd64        Full screen ncurses traceroute tool
ii  mysql-common                                     5.8+1.0.8                               all          MySQL database common files, e.g. /etc/mysql/my.cnf
ii  nano                                             6.2-1                                   amd64        small, friendly text editor inspired by Pico
ii  nautilus                                         1:42.2-0ubuntu2.1                       amd64        file manager and graphical shell for GNOME
ii  nautilus-data                                    1:42.2-0ubuntu2.1                       all          data files for nautilus
ii  ncurses-base                                     6.3-2                                   all          basic terminal type definitions
ii  ncurses-bin                                      6.3-2                                   amd64        terminal-related programs and man pages
ii  netbase                                          6.3                                     all          Basic TCP/IP networking system
ii  netcat-openbsd                                   1.218-4ubuntu1                          amd64        TCP/IP swiss army knife
ii  netpbm                                           2:10.0-15.4                             amd64        Graphics conversion tools between image formats
ii  netplan.io                                       0.105-0ubuntu2~22.04.3                  amd64        YAML network configuration abstraction for various backends
ii  networkd-dispatcher                              2.1-2ubuntu0.22.04.2                    all          Dispatcher service for systemd-networkd connection status changes
ii  nftables                                         1.0.2-1ubuntu3                          amd64        Program to control packet filtering rules by Netfilter project
ii  ntfs-3g                                          1:2021.8.22-3ubuntu1.2                  amd64        read/write NTFS driver for FUSE
ii  ocl-icd-libopencl1:amd64                         2.2.14-3                                amd64        Generic OpenCL ICD Loader
ii  openssh-client                                   1:8.9p1-3ubuntu0.1                      amd64        secure shell (SSH) client, for secure access to remote machines
ii  openssl                                          3.0.2-0ubuntu1.8                        amd64        Secure Sockets Layer toolkit - cryptographic utility
ii  p11-kit                                          0.24.0-6build1                          amd64        p11-glue utilities
ii  p11-kit-modules:amd64                            0.24.0-6build1                          amd64        p11-glue proxy and trust modules
ii  packagekit                                       1.2.5-2ubuntu2                          amd64        Provides a package management service
ii  packagekit-tools                                 1.2.5-2ubuntu2                          amd64        Provides PackageKit command-line tools
ii  parted                                           3.4-2build1                             amd64        disk partition manipulator
ii  passwd                                           1:4.8.1-2ubuntu2.1                      amd64        change and administer password and group data
ii  pastebinit                                       1.5.1-1ubuntu1                          all          command-line pastebin client
ii  patch                                            2.7.6-7build2                           amd64        Apply a diff file to an original
ii  pci.ids                                          0.0~2022.01.22-1                        all          PCI ID Repository
ii  pciutils                                         1:3.7.0-6                               amd64        PCI utilities
ii  perl                                             5.34.0-3ubuntu1.1                       amd64        Larry Wall's Practical Extraction and Report Language
ii  perl-base                                        5.34.0-3ubuntu1.1                       amd64        minimal Perl system
ii  perl-modules-5.34                                5.34.0-3ubuntu1.1                       all          Core Perl modules
ii  pigz                                             2.6-1                                   amd64        Parallel Implementation of GZip
ii  pinentry-curses                                  1.1.1-1build2                           amd64        curses-based PIN or pass-phrase entry dialog for GnuPG
ii  pinentry-gnome3                                  1.1.1-1build2                           amd64        GNOME 3 PIN or pass-phrase entry dialog for GnuPG
ii  pkexec                                           0.105-33                                amd64        run commands as another user with polkit authorization
ii  pkg-config                                       0.29.2-1ubuntu3                         amd64        manage compile and link flags for libraries
ii  plymouth                                         0.9.5+git20211018-1ubuntu3              amd64        boot animation, logger and I/O multiplexer
ii  plymouth-theme-ubuntu-text                       0.9.5+git20211018-1ubuntu3              amd64        boot animation, logger and I/O multiplexer - ubuntu text theme
ii  pocketsphinx-en-us                               0.8.0+real5prealpha+1-14ubuntu1         all          Speech recognition tool - US English language model
ii  podman                                           3.4.4+ds1-1ubuntu1                      amd64        engine to run OCI-based containers in Pods
ii  policykit-1                                      0.105-33                                amd64        transitional package for polkitd and pkexec
ii  polkitd                                          0.105-33                                amd64        framework for managing administrative policies and privileges
ii  poppler-data                                     0.4.11-1                                all          encoding data for the poppler PDF rendering library
ii  portaudio19-dev:amd64                            19.6.0-1.1                              amd64        Portable audio I/O - development files
iF  postfix                                          3.6.4-1ubuntu1.1                        amd64        High-performance mail transport agent
ii  powermgmt-base                                   1.36                                    all          common utils for power management
ii  procps                                           2:3.3.17-6ubuntu2                       amd64        /proc file system utilities
ii  psmisc                                           23.4-2build3                            amd64        utilities that use the proc file system
ii  publicsuffix                                     20211207.1025-1                         all          accurate, machine-readable list of domain name suffixes
ii  python-apt-common                                2.4.0ubuntu1                            all          Python interface to libapt-pkg (locales)
ii  python3                                          3.10.6-1~22.04                          amd64        interactive high-level object-oriented language (default python3 version)
ii  python3-apport                                   2.20.11-0ubuntu82.4                     all          Python 3 library for Apport crash report handling
ii  python3-apt                                      2.4.0ubuntu1                            amd64        Python 3 interface to libapt-pkg
ii  python3-attr                                     21.2.0-1                                all          Attributes without boilerplate (Python 3)
ii  python3-blinker                                  1.4+dfsg1-0.4                           all          fast, simple object-to-object and broadcast signaling library
ii  python3-certifi                                  2020.6.20-1                             all          root certificates for validating SSL certs and verifying TLS hosts (python3)
ii  python3-cffi-backend:amd64                       1.15.0-1build2                          amd64        Foreign Function Interface for Python 3 calling C code - runtime
ii  python3-chardet                                  4.0.0-1                                 all          universal character encoding detector for Python3
ii  python3-commandnotfound                          22.04.0                                 all          Python 3 bindings for command-not-found.
ii  python3-cryptography                             3.4.8-1ubuntu2                          amd64        Python library exposing cryptographic recipes and primitives (Python 3)
ii  python3-dbus                                     1.2.18-3build1                          amd64        simple interprocess messaging system (Python 3 interface)
ii  python3-dev                                      3.10.6-1~22.04                          amd64        header files and a static library for Python (default)
ii  python3-distro                                   1.7.0-1                                 all          Linux OS platform information API
ii  python3-distro-info                              1.1build1                               all          information about distributions' releases (Python 3 module)
ii  python3-distupgrade                              1:22.04.16                              all          manage release upgrades
ii  python3-distutils                                3.10.6-1~22.04                          all          distutils package for Python 3.x
ii  python3-docker                                   5.0.3-1                                 all          Python 3 wrapper to access docker.io's control socket
ii  python3-dockerpty                                0.4.1-2                                 all          Pseudo-tty handler for docker Python client (Python 3.x)
ii  python3-docopt                                   0.6.2-4                                 all          command-line interface description language (Python3)
ii  python3-dotenv                                   0.19.2-1                                all          Get and set values in the .env file in local and production servers
ii  python3-gdbm:amd64                               3.10.6-1~22.04                          amd64        GNU dbm database support for Python 3.x
ii  python3-gi                                       3.42.1-0ubuntu1                         amd64        Python 3 bindings for gobject-introspection libraries
ii  python3-httplib2                                 0.20.2-2                                all          comprehensive HTTP client library written for Python3
ii  python3-idna                                     3.3-1                                   all          Python IDNA2008 (RFC 5891) handling (Python 3)
ii  python3-importlib-metadata                       4.6.4-1                                 all          library to access the metadata for a Python package - Python 3.x
ii  python3-ipython-genutils                         0.2.0-5                                 all          IPython vestigial utilities for Python 3
ii  python3-jeepney                                  0.7.1-3                                 all          pure Python D-Bus interface
ii  python3-jsonschema                               3.2.0-0ubuntu2                          all          An(other) implementation of JSON Schema (Draft 3 and 4) - Python 3.x
ii  python3-jupyter-core                             4.9.1-1                                 all          Core common functionality of Jupyter projects for Python 3
ii  python3-jwt                                      2.3.0-1ubuntu0.2                        all          Python 3 implementation of JSON Web Token
ii  python3-keyring                                  23.5.0-1                                all          store and access your passwords safely
ii  python3-launchpadlib                             1.10.16-1                               all          Launchpad web services client library (Python 3)
ii  python3-lazr.restfulclient                       0.14.4-1                                all          client for lazr.restful-based web services (Python 3)
ii  python3-lazr.uri                                 1.0.6-2                                 all          library for parsing, manipulating, and generating URIs
ii  python3-ldb                                      2:2.4.4-0ubuntu0.22.04.2                amd64        Python 3 bindings for LDB
ii  python3-lib2to3                                  3.10.6-1~22.04                          all          Interactive high-level object-oriented language (lib2to3)
ii  python3-mako                                     1.1.3+ds1-2ubuntu0.1                    all          fast and lightweight templating for the Python 3 platform
ii  python3-markdown                                 3.3.6-1                                 all          text-to-HTML conversion library/tool (Python 3 version)
ii  python3-markupsafe                               2.0.1-2build1                           amd64        HTML/XHTML/XML string library
ii  python3-minimal                                  3.10.6-1~22.04                          amd64        minimal subset of the Python language (default python3 version)
ii  python3-more-itertools                           8.10.0-2                                all          library with routines for operating on iterables, beyond itertools (Python 3)
ii  python3-netifaces:amd64                          0.11.0-1build2                          amd64        portable network interface information - Python 3.x
ii  python3-newt:amd64                               0.52.21-5ubuntu2                        amd64        NEWT module for Python3
ii  python3-oauthlib                                 3.2.0-1ubuntu0.1                        all          generic, spec-compliant implementation of OAuth for Python3
ii  python3-pip                                      22.0.2+dfsg-1ubuntu0.2                  all          Python package installer
ii  python3-pip-whl                                  22.0.2+dfsg-1ubuntu0.2                  all          Python package installer (pip wheel)
ii  python3-pkg-resources                            59.6.0-1.2ubuntu0.22.04.1               all          Package Discovery and Resource Access using pkg_resources
ii  python3-problem-report                           2.20.11-0ubuntu82.4                     all          Python 3 library to handle problem reports
ii  python3-pygments                                 2.11.2+dfsg-2                           all          syntax highlighting package written in Python 3
ii  python3-pyparsing                                2.4.7-1                                 all          alternative to creating and executing simple grammars - Python 3.x
ii  python3-pyrsistent:amd64                         0.18.1-1build1                          amd64        persistent/functional/immutable data structures for Python
ii  python3-requests                                 2.25.1+dfsg-2                           all          elegant and simple HTTP library for Python3, built for human beings
ii  python3-secretstorage                            3.3.1-1                                 all          Python module for storing secrets - Python 3.x version
ii  python3-setuptools                               59.6.0-1.2ubuntu0.22.04.1               all          Python3 Distutils Enhancements
ii  python3-setuptools-whl                           59.6.0-1.2ubuntu0.22.04.1               all          Python Distutils Enhancements (wheel package)
ii  python3-six                                      1.16.0-3ubuntu1                         all          Python 2 and 3 compatibility library (Python 3 interface)
ii  python3-software-properties                      0.99.22.6                               all          manage the repositories that you install software from
ii  python3-systemd                                  234-3ubuntu2                            amd64        Python 3 bindings for systemd
ii  python3-talloc:amd64                             2.3.3-2build1                           amd64        hierarchical pool based memory allocator - Python3 bindings
ii  python3-texttable                                1.6.4-1                                 all          Module for creating simple ASCII tables — python3
ii  python3-traitlets                                5.1.1-1                                 all          Lightweight Traits-like package for Python 3
ii  python3-update-manager                           1:22.04.10                              all          python 3.x module for update-manager
ii  python3-urllib3                                  1.26.5-1~exp1                           all          HTTP library with thread-safe connection pooling for Python3
ii  python3-venv                                     3.10.6-1~22.04                          amd64        venv module for python3 (default python3 version)
ii  python3-wadllib                                  1.3.6-1                                 all          Python 3 library for navigating WADL files
ii  python3-websocket                                1.2.3-1                                 all          WebSocket client library - Python 3.x
ii  python3-wheel                                    0.37.1-2ubuntu0.22.04.1                 all          built-package format for Python
ii  python3-yaml                                     5.4.1-1ubuntu1                          amd64        YAML parser and emitter for Python3
ii  python3-zipp                                     1.0.0-3                                 all          pathlib-compatible Zipfile object wrapper - Python 3.x
ii  python3.10                                       3.10.6-1~22.04.2ubuntu1                 amd64        Interactive high-level object-oriented language (version 3.10)
ii  python3.10-dev                                   3.10.6-1~22.04.2ubuntu1                 amd64        Header files and a static library for Python (v3.10)
ii  python3.10-minimal                               3.10.6-1~22.04.2ubuntu1                 amd64        Minimal subset of the Python language (version 3.10)
ii  python3.10-venv                                  3.10.6-1~22.04.2ubuntu1                 amd64        Interactive high-level object-oriented language (pyvenv binary, version 3.10)
ii  readline-common                                  8.1.2-1                                 all          GNU readline and history libraries, common files
ii  rpcsvc-proto                                     1.4.2-0ubuntu6                          amd64        RPC protocol compiler and definitions
ii  rsync                                            3.2.7-0ubuntu0.22.04.2                  amd64        fast, versatile, remote (and local) file-copying tool
ii  rsyslog                                          8.2112.0-2ubuntu2.2                     amd64        reliable system and kernel logging daemon
ii  run-one                                          1.17-0ubuntu1                           all          run just one instance of a command and its args at a time
ii  runc                                             1.1.4-0ubuntu1~22.04.1                  amd64        Open Container Project - runtime
ii  samba-libs:amd64                                 2:4.15.13+dfsg-0ubuntu1.1               amd64        Samba core libraries
ii  screen                                           4.9.0-1                                 amd64        terminal multiplexer with VT100/ANSI terminal emulation
ii  sed                                              4.8-1ubuntu2                            amd64        GNU stream editor for filtering/transforming text
ii  sensible-utils                                   0.0.17                                  all          Utilities for sensible alternative selection
ii  session-migration                                0.3.6                                   amd64        Tool to migrate in user session settings
ii  shared-mime-info                                 2.1-2                                   amd64        FreeDesktop.org shared MIME database and spec
ii  show-motd                                        3.10                                    all          show message of the day in interactive shells
ii  slirp4netns                                      1.0.1-2                                 amd64        User-mode networking for unprivileged network namespaces
ii  snapd                                            2.58+22.04                              amd64        Daemon and tooling that enable snap packages
ii  software-properties-common                       0.99.22.6                               all          manage the repositories that you install software from (common)
ii  squashfs-tools                                   1:4.5-3build1                           amd64        Tool to create and append to squashfs filesystems
ii  ssl-cert                                         1.1.2                                   all          simple debconf wrapper for OpenSSL
ii  strace                                           5.16-0ubuntu3                           amd64        System call tracer
ii  sudo                                             1.9.9-1ubuntu2.4                        amd64        Provide limited super user privileges to specific users
ii  systemd                                          249.11-0ubuntu3.9                       amd64        system and service manager
ii  systemd-hwe-hwdb                                 249.11.3                                all          udev rules for hardware enablement (HWE)
ii  systemd-sysv                                     249.11-0ubuntu3.9                       amd64        system and service manager - SysV links
ii  systemd-timesyncd                                249.11-0ubuntu3.9                       amd64        minimalistic service to synchronize local time with NTP servers
ii  sysvinit-utils                                   3.01-1ubuntu1                           amd64        System-V-like utilities
ii  tar                                              1.34+dfsg-1ubuntu0.1.22.04.1            amd64        GNU version of the tar archiving utility
ii  tcpdump                                          4.99.1-3ubuntu0.1                       amd64        command-line network traffic analyzer
ii  telnet                                           0.17-44build1                           amd64        basic telnet client
ii  time                                             1.9-0.1build2                           amd64        GNU time program for measuring CPU resource usage
ii  tmux                                             3.2a-4ubuntu0.2                         amd64        terminal multiplexer
ii  tnftp                                            20210827-4build1                        amd64        enhanced ftp client
ii  tracker                                          3.3.0-1                                 amd64        metadata database, indexer and search tool
ii  tracker-extract                                  3.3.0-1                                 amd64        metadata database, indexer and search tool - metadata extractors
ii  tracker-miner-fs                                 3.3.0-1                                 amd64        metadata database, indexer and search tool - filesystem indexer
ii  tzdata                                           2023c-0ubuntu0.22.04.0                  all          time zone and daylight-saving time data
ii  ubuntu-advantage-tools                           27.13.6~22.04.1                         amd64        management tools for Ubuntu Pro
ii  ubuntu-fan                                       0.12.16                                 all          Ubuntu FAN network support enablement
ii  ubuntu-keyring                                   2021.03.26                              all          GnuPG keys of the Ubuntu archive
ii  ubuntu-minimal                                   1.481                                   amd64        Minimal core of Ubuntu
ii  ubuntu-mono                                      20.10-0ubuntu2                          all          Ubuntu Mono Icon theme
ii  ubuntu-release-upgrader-core                     1:22.04.16                              all          manage release upgrades
ii  ubuntu-standard                                  1.481                                   amd64        The Ubuntu standard system
ii  ubuntu-wsl                                       1.481                                   amd64        Ubuntu on Windows tools - Windows Subsystem for Linux integration
ii  ucf                                              3.0043                                  all          Update Configuration File(s): preserve user changes to config files
ii  udev                                             249.11-0ubuntu3.9                       amd64        /dev/ and hotplug management daemon
ii  udisks2                                          2.9.4-1ubuntu2                          amd64        D-Bus service to access and manipulate storage devices
ii  ufw                                              0.36.1-4build1                          all          program for managing a Netfilter firewall
ii  uidmap                                           1:4.8.1-2ubuntu2.1                      amd64        programs to help use subuids
ii  unattended-upgrades                              2.8ubuntu1                              all          automatic installation of security upgrades
ii  update-manager-core                              1:22.04.10                              all          manage release upgrades
ii  update-motd                                      3.10                                    all          complements pam_motd in libpam-modules
ii  upower                                           0.99.17-1                               amd64        abstraction for power management
ii  usb.ids                                          2022.04.02-1                            all          USB ID Repository
ii  usbmuxd                                          1.1.1-2build2                           amd64        USB multiplexor daemon for iPhone and iPod Touch devices
ii  usbutils                                         1:014-1build1                           amd64        Linux USB utilities
ii  usrmerge                                         25ubuntu2                               all          Convert the system to the merged /usr directories scheme
ii  util-linux                                       2.37.2-4ubuntu3                         amd64        miscellaneous system utilities
ii  uuid-dev:amd64                                   2.37.2-4ubuntu3                         amd64        Universally Unique ID library - headers and static libraries
ii  uuid-runtime                                     2.37.2-4ubuntu3                         amd64        runtime components for the Universally Unique ID library
ii  va-driver-all:amd64                              2.14.0-1                                amd64        Video Acceleration (VA) API -- driver metapackage
ii  vdpau-driver-all:amd64                           1.4-3build2                             amd64        Video Decode and Presentation API for Unix (driver metapackage)
ii  vim                                              2:8.2.3995-1ubuntu2.7                   amd64        Vi IMproved - enhanced vi editor
ii  vim-common                                       2:8.2.3995-1ubuntu2.7                   all          Vi IMproved - Common files
ii  vim-runtime                                      2:8.2.3995-1ubuntu2.7                   all          Vi IMproved - Runtime files
ii  vim-tiny                                         2:8.2.3995-1ubuntu2.7                   amd64        Vi IMproved - enhanced vi editor - compact version
ii  wget                                             1.21.2-2ubuntu1                         amd64        retrieves files from the web
ii  whiptail                                         0.52.21-5ubuntu2                        amd64        Displays user-friendly dialog boxes from shell scripts
ii  wsl-setup                                        0.2                                     amd64        WSL setup snap launcher
ii  x11-common                                       1:7.7+23ubuntu2                         all          X Window System (X.Org) infrastructure
ii  x11proto-dev                                     2021.5-1                                all          X11 extension protocols and auxiliary headers
ii  xauth                                            1:1.1-1build2                           amd64        X authentication utility
ii  xdg-user-dirs                                    0.17-2ubuntu4                           amd64        tool to manage well known user directories
ii  xkb-data                                         2.33-1                                  all          X Keyboard Extension (XKB) configuration data
ii  xorg-sgml-doctools                               1:1.11-1.1                              all          Common tools for building X.Org SGML documentation
ii  xtrans-dev                                       1.4.0-1                                 all          X transport library (development files)
ii  xxd                                              2:8.2.3995-1ubuntu2.5                   amd64        tool to make (or reverse) a hex dump
ii  xz-utils                                         5.2.5-2ubuntu1                          amd64        XZ-format compression utilities
ii  zlib1g:amd64                                     1:1.2.11.dfsg-2ubuntu9.2                amd64        compression library - runtime
ii  zlib1g-dev:amd64                                 1:1.2.11.dfsg-2ubuntu9.2                amd64        compression library - development
lines 950-1021/1021 (END)
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$
ii  screen                                           4.9.0-1                                 amd64        terminal multiplexer with VT100/ANSI terminal emulation
ii  sed                                              4.8-1ubuntu2                            amd64        GNU stream editor for filtering/transforming text
ii  sensible-utils                                   0.0.17                                  all          Utilities for sensible alternative selection
ii  session-migration                                0.3.6                                   amd64        Tool to migrate in user session settings
ii  shared-mime-info                                 2.1-2                                   amd64        FreeDesktop.org shared MIME database and spec
ii  show-motd                                        3.10                                    all          show message of the day in interactive shells
ii  slirp4netns                                      1.0.1-2                                 amd64        User-mode networking for unprivileged network namespaces
ii  snapd                                            2.58+22.04                              amd64        Daemon and tooling that enable snap packages
ii  software-properties-common                       0.99.22.6                               all          manage the repositories that you install software from (common)
ii  squashfs-tools                                   1:4.5-3build1                           amd64        Tool to create and append to squashfs filesystems
ii  ssl-cert                                         1.1.2                                   all          simple debconf wrapper for OpenSSL
ii  strace                                           5.16-0ubuntu3                           amd64        System call tracer
ii  sudo                                             1.9.9-1ubuntu2.4                        amd64        Provide limited super user privileges to specific users
ii  systemd                                          249.11-0ubuntu3.9                       amd64        system and service manager
ii  systemd-hwe-hwdb                                 249.11.3                                all          udev rules for hardware enablement (HWE)
ii  systemd-sysv                                     249.11-0ubuntu3.9                       amd64        system and service manager - SysV links
ii  systemd-timesyncd                                249.11-0ubuntu3.9                       amd64        minimalistic service to synchronize local time with NTP servers
ii  sysvinit-utils                                   3.01-1ubuntu1                           amd64        System-V-like utilities
ii  tar                                              1.34+dfsg-1ubuntu0.1.22.04.1            amd64        GNU version of the tar archiving utility
ii  tcpdump                                          4.99.1-3ubuntu0.1                       amd64        command-line network traffic analyzer
ii  telnet                                           0.17-44build1                           amd64        basic telnet client
ii  time                                             1.9-0.1build2                           amd64        GNU time program for measuring CPU resource usage
ii  tmux                                             3.2a-4ubuntu0.2                         amd64        terminal multiplexer
ii  tnftp                                            20210827-4build1                        amd64        enhanced ftp client
ii  tracker                                          3.3.0-1                                 amd64        metadata database, indexer and search tool
ii  tracker-extract                                  3.3.0-1                                 amd64        metadata database, indexer and search tool - metadata extractors
ii  tracker-miner-fs                                 3.3.0-1                                 amd64        metadata database, indexer and search tool - filesystem indexer
ii  tzdata                                           2023c-0ubuntu0.22.04.0                  all          time zone and daylight-saving time data
ii  ubuntu-advantage-tools                           27.13.6~22.04.1                         amd64        management tools for Ubuntu Pro
ii  ubuntu-fan                                       0.12.16                                 all          Ubuntu FAN network support enablement
ii  ubuntu-keyring                                   2021.03.26                              all          GnuPG keys of the Ubuntu archive
ii  ubuntu-minimal                                   1.481                                   amd64        Minimal core of Ubuntu
ii  ubuntu-mono                                      20.10-0ubuntu2                          all          Ubuntu Mono Icon theme
ii  ubuntu-release-upgrader-core                     1:22.04.16                              all          manage release upgrades
ii  ubuntu-standard                                  1.481                                   amd64        The Ubuntu standard system
ii  ubuntu-wsl                                       1.481                                   amd64        Ubuntu on Windows tools - Windows Subsystem for Linux integration
ii  ucf                                              3.0043                                  all          Update Configuration File(s): preserve user changes to config files
ii  udev                                             249.11-0ubuntu3.9                       amd64        /dev/ and hotplug management daemon
ii  udisks2                                          2.9.4-1ubuntu2                          amd64        D-Bus service to access and manipulate storage devices
ii  ufw                                              0.36.1-4build1                          all          program for managing a Netfilter firewall
ii  uidmap                                           1:4.8.1-2ubuntu2.1                      amd64        programs to help use subuids
ii  unattended-upgrades                              2.8ubuntu1                              all          automatic installation of security upgrades
ii  update-manager-core                              1:22.04.10                              all          manage release upgrades
ii  update-motd                                      3.10                                    all          complements pam_motd in libpam-modules
ii  upower                                           0.99.17-1                               amd64        abstraction for power management
ii  usb.ids                                          2022.04.02-1                            all          USB ID Repository
ii  usbmuxd                                          1.1.1-2build2                           amd64        USB multiplexor daemon for iPhone and iPod Touch devices
ii  usbutils                                         1:014-1build1                           amd64        Linux USB utilities
ii  usrmerge                                         25ubuntu2                               all          Convert the system to the merged /usr directories scheme
ii  util-linux                                       2.37.2-4ubuntu3                         amd64        miscellaneous system utilities
ii  uuid-dev:amd64                                   2.37.2-4ubuntu3                         amd64        Universally Unique ID library - headers and static libraries
ii  uuid-runtime                                     2.37.2-4ubuntu3                         amd64        runtime components for the Universally Unique ID library
ii  va-driver-all:amd64                              2.14.0-1                                amd64        Video Acceleration (VA) API -- driver metapackage
ii  vdpau-driver-all:amd64                           1.4-3build2                             amd64        Video Decode and Presentation API for Unix (driver metapackage)
ii  vim                                              2:8.2.3995-1ubuntu2.7                   amd64        Vi IMproved - enhanced vi editor
ii  vim-common                                       2:8.2.3995-1ubuntu2.7                   all          Vi IMproved - Common files
ii  vim-runtime                                      2:8.2.3995-1ubuntu2.7                   all          Vi IMproved - Runtime files
ii  vim-tiny                                         2:8.2.3995-1ubuntu2.7                   amd64        Vi IMproved - enhanced vi editor - compact version
ii  wget                                             1.21.2-2ubuntu1                         amd64        retrieves files from the web
ii  whiptail                                         0.52.21-5ubuntu2                        amd64        Displays user-friendly dialog boxes from shell scripts
ii  wsl-setup                                        0.2                                     amd64        WSL setup snap launcher
ii  x11-common                                       1:7.7+23ubuntu2                         all          X Window System (X.Org) infrastructure
ii  x11proto-dev                                     2021.5-1                                all          X11 extension protocols and auxiliary headers
ii  xauth                                            1:1.1-1build2                           amd64        X authentication utility
ii  xdg-user-dirs                                    0.17-2ubuntu4                           amd64        tool to manage well known user directories
ii  xkb-data                                         2.33-1                                  all          X Keyboard Extension (XKB) configuration data
ii  xorg-sgml-doctools                               1:1.11-1.1                              all          Common tools for building X.Org SGML documentation
ii  xtrans-dev                                       1.4.0-1                                 all          X transport library (development files)
ii  xxd                                              2:8.2.3995-1ubuntu2.5                   amd64        tool to make (or reverse) a hex dump
ii  xz-utils                                         5.2.5-2ubuntu1                          amd64        XZ-format compression utilities
ii  zlib1g:amd64                                     1:1.2.11.dfsg-2ubuntu9.2                amd64        compression library - runtime
ii  zlib1g-dev:amd64                                 1:1.2.11.dfsg-2ubuntu9.2                amd64        compression library - development
^C
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ dpkg --get-selections > packages.txt
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ ls packages.txt
packages.txt
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ ls -a packages.txt
packages.txt
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ ls -a
.  ..  convert_gptneox_to_ggml.py  install-RedPajama-INCITE-Base-3B-v1.sh  install-RedPajama-INCITE-Chat-3B-v1.sh  install-RedPajama-INCITE-Instruct-3B-v1.sh  packages.txt  quantize-gptneox.py
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install $cat packages.txt | awk '{print $1}')
-bash: syntax error near unexpected token `)'
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install $(cat packages.txt | awk '{print $1}')
[sudo] password for cwcorella:
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
adduser is already the newest version (3.118ubuntu5).
adduser set to manually installed.
adwaita-icon-theme is already the newest version (41.0-1ubuntu1).
adwaita-icon-theme set to manually installed.
alsa-topology-conf is already the newest version (1.2.5.1-2).
alsa-topology-conf set to manually installed.
alsa-utils is already the newest version (1.2.6-1ubuntu1).
apport-symptoms is already the newest version (0.24).
apport-symptoms set to manually installed.
at-spi2-core is already the newest version (2.44.0-3).
at-spi2-core set to manually installed.
base-passwd is already the newest version (3.5.52build1).
bash is already the newest version (5.1-6ubuntu1).
bash-completion is already the newest version (1:2.11-5ubuntu1).
bash-completion set to manually installed.
bridge-utils is already the newest version (1.7-1ubuntu3).
bridge-utils set to manually installed.
bsdextrautils is already the newest version (2.37.2-4ubuntu3).
bsdextrautils set to manually installed.
bsdutils is already the newest version (1:2.37.2-4ubuntu3).
bubblewrap is already the newest version (0.6.1-1).
bubblewrap set to manually installed.
build-essential is already the newest version (12.9ubuntu3).
busybox-static is already the newest version (1:1.30.1-7ubuntu3).
busybox-static set to manually installed.
byobu is already the newest version (5.133-1).
byobu set to manually installed.
bzip2 is already the newest version (1.0.8-5build1).
bzip2 set to manually installed.
command-not-found is already the newest version (22.04.0).
command-not-found set to manually installed.
console-setup is already the newest version (1.205ubuntu3).
console-setup set to manually installed.
console-setup-linux is already the newest version (1.205ubuntu3).
console-setup-linux set to manually installed.
coreutils is already the newest version (8.32-4.1ubuntu1).
coreutils set to manually installed.
cpio is already the newest version (2.13+dfsg-7).
cpio set to manually installed.
cpp is already the newest version (4:11.2.0-1ubuntu1).
cpp set to manually installed.
cron is already the newest version (3.0pl1-137ubuntu3).
cron set to manually installed.
dash is already the newest version (0.5.11+git20210903+057cd650a4ed-3build1).
dconf-gsettings-backend is already the newest version (0.40.0-3).
dconf-gsettings-backend set to manually installed.
dconf-service is already the newest version (0.40.0-3).
dconf-service set to manually installed.
debconf is already the newest version (1.5.79ubuntu1).
debconf set to manually installed.
debconf-i18n is already the newest version (1.5.79ubuntu1).
debconf-i18n set to manually installed.
debianutils is already the newest version (5.5-1ubuntu2).
debianutils set to manually installed.
desktop-file-utils is already the newest version (0.26-1ubuntu3).
desktop-file-utils set to manually installed.
diffutils is already the newest version (1:3.8-0ubuntu2).
distro-info is already the newest version (1.1build1).
distro-info set to manually installed.
dmsetup is already the newest version (2:1.02.175-2.1ubuntu4).
dmsetup set to manually installed.
dns-root-data is already the newest version (2021011101).
dns-root-data set to manually installed.
dosfstools is already the newest version (4.2-1build3).
dosfstools set to manually installed.
ed is already the newest version (1.18-1).
ed set to manually installed.
eject is already the newest version (2.37.2-4ubuntu3).
eject set to manually installed.
fakeroot is already the newest version (1.28-1ubuntu1).
fakeroot set to manually installed.
fdisk is already the newest version (2.37.2-4ubuntu3).
fdisk set to manually installed.
file is already the newest version (1:5.41-3).
file set to manually installed.
findutils is already the newest version (4.8.0-1ubuntu3).
flex is already the newest version (2.6.4-8build2).
fontconfig is already the newest version (2.13.1-4.2ubuntu5).
fontconfig set to manually installed.
fontconfig-config is already the newest version (2.13.1-4.2ubuntu5).
fontconfig-config set to manually installed.
fonts-dejavu-core is already the newest version (2.37-2build1).
fonts-dejavu-core set to manually installed.
fonts-droid-fallback is already the newest version (1:6.0.1r16-1.1build1).
fonts-droid-fallback set to manually installed.
fonts-noto-mono is already the newest version (20201225-1build1).
fonts-noto-mono set to manually installed.
fonts-ubuntu is already the newest version (0.83-6ubuntu1).
fonts-ubuntu set to manually installed.
fonts-urw-base35 is already the newest version (20200910-1).
fonts-urw-base35 set to manually installed.
friendly-recovery is already the newest version (0.2.42).
friendly-recovery set to manually installed.
ftp is already the newest version (20210827-4build1).
ftp set to manually installed.
fuse3 is already the newest version (3.10.5-1build1).
fuse3 set to manually installed.
g++ is already the newest version (4:11.2.0-1ubuntu1).
g++ set to manually installed.
gawk is already the newest version (1:5.1.0-1build3).
gawk set to manually installed.
gcc is already the newest version (4:11.2.0-1ubuntu1).
gcc set to manually installed.
gcc-multilib is already the newest version (4:11.2.0-1ubuntu1).
gcc-multilib set to manually installed.
gcr is already the newest version (3.40.0-4).
gcr set to manually installed.
gdisk is already the newest version (1.0.8-4build1).
gdisk set to manually installed.
gettext-base is already the newest version (0.21-4ubuntu4).
gettext-base set to manually installed.
gir1.2-atk-1.0 is already the newest version (2.36.0-3build1).
gir1.2-atk-1.0 set to manually installed.
gir1.2-freedesktop is already the newest version (1.72.0-1).
gir1.2-freedesktop set to manually installed.
gir1.2-glib-2.0 is already the newest version (1.72.0-1).
gir1.2-glib-2.0 set to manually installed.
gir1.2-gst-plugins-base-1.0 is already the newest version (1.20.1-1).
gir1.2-gst-plugins-base-1.0 set to manually installed.
gir1.2-gudev-1.0 is already the newest version (1:237-2build1).
gir1.2-gudev-1.0 set to manually installed.
gir1.2-packagekitglib-1.0 is already the newest version (1.2.5-2ubuntu2).
gir1.2-packagekitglib-1.0 set to manually installed.
glib-networking is already the newest version (2.72.0-1).
glib-networking set to manually installed.
glib-networking-common is already the newest version (2.72.0-1).
glib-networking-common set to manually installed.
glib-networking-services is already the newest version (2.72.0-1).
glib-networking-services set to manually installed.
gobject-introspection is already the newest version (1.72.0-1).
gobject-introspection set to manually installed.
grep is already the newest version (3.7-1build1).
groff-base is already the newest version (1.22.4-8build1).
groff-base set to manually installed.
gsettings-desktop-schemas is already the newest version (42.0-1ubuntu1).
gsettings-desktop-schemas set to manually installed.
gstreamer1.0-gl is already the newest version (1.20.1-1).
gstreamer1.0-gl set to manually installed.
gstreamer1.0-plugins-base is already the newest version (1.20.1-1).
gstreamer1.0-plugins-base set to manually installed.
gstreamer1.0-x is already the newest version (1.20.1-1).
gstreamer1.0-x set to manually installed.
hdparm is already the newest version (9.60+ds-1build3).
hdparm set to manually installed.
hicolor-icon-theme is already the newest version (0.17-2).
hicolor-icon-theme set to manually installed.
hostname is already the newest version (3.23ubuntu2).
htop is already the newest version (3.0.5-7build2).
htop set to manually installed.
humanity-icon-theme is already the newest version (0.6.16).
humanity-icon-theme set to manually installed.
info is already the newest version (6.8-4build1).
info set to manually installed.
init is already the newest version (1.62).
init-system-helpers is already the newest version (1.62).
init-system-helpers set to manually installed.
install-info is already the newest version (6.8-4build1).
install-info set to manually installed.
iproute2 is already the newest version (5.15.0-1ubuntu2).
iproute2 set to manually installed.
iptables is already the newest version (1.8.7-1ubuntu5).
iptables set to manually installed.
iputils-ping is already the newest version (3:20211215-1).
iputils-ping set to manually installed.
iputils-tracepath is already the newest version (3:20211215-1).
iputils-tracepath set to manually installed.
irqbalance is already the newest version (1.8.0-1build1).
irqbalance set to manually installed.
iso-codes is already the newest version (4.9.0-1).
iso-codes set to manually installed.
javascript-common is already the newest version (11+nmu1).
javascript-common set to manually installed.
keyboard-configuration is already the newest version (1.205ubuntu3).
keyboard-configuration set to manually installed.
kmod is already the newest version (29-1ubuntu1).
kmod set to manually installed.
libaa1 is already the newest version (1.4p5-50build1).
libaa1 set to manually installed.
libacl1 is already the newest version (2.3.1-1).
libacl1 set to manually installed.
libalgorithm-diff-perl is already the newest version (1.201-1).
libalgorithm-diff-perl set to manually installed.
libalgorithm-diff-xs-perl is already the newest version (0.04-6build3).
libalgorithm-diff-xs-perl set to manually installed.
libalgorithm-merge-perl is already the newest version (0.08-3).
libalgorithm-merge-perl set to manually installed.
libappstream4 is already the newest version (0.15.2-2).
libappstream4 set to manually installed.
libarchive13 is already the newest version (3.6.0-1ubuntu1).
libarchive13 set to manually installed.
libargon2-1 is already the newest version (0~20171227-0.3).
libargon2-1 set to manually installed.
libasound2 is already the newest version (1.2.6.1-1ubuntu1).
libasound2 set to manually installed.
libasound2-data is already the newest version (1.2.6.1-1ubuntu1).
libasound2-data set to manually installed.
libasound2-dev is already the newest version (1.2.6.1-1ubuntu1).
libassuan0 is already the newest version (2.5.5-1build1).
libassuan0 set to manually installed.
libasyncns0 is already the newest version (0.8-6build2).
libasyncns0 set to manually installed.
libatasmart4 is already the newest version (0.19-5build2).
libatasmart4 set to manually installed.
libatk-bridge2.0-0 is already the newest version (2.38.0-3).
libatk-bridge2.0-0 set to manually installed.
libatk1.0-0 is already the newest version (2.36.0-3build1).
libatk1.0-0 set to manually installed.
libatk1.0-data is already the newest version (2.36.0-3build1).
libatk1.0-data set to manually installed.
libatm1 is already the newest version (1:2.5.1-4build2).
libatm1 set to manually installed.
libatopology2 is already the newest version (1.2.6.1-1ubuntu1).
libatopology2 set to manually installed.
libatspi2.0-0 is already the newest version (2.44.0-3).
libatspi2.0-0 set to manually installed.
libattr1 is already the newest version (1:2.5.1-1build1).
libattr1 set to manually installed.
libaudit-common is already the newest version (1:3.0.7-1build1).
libaudit-common set to manually installed.
libaudit1 is already the newest version (1:3.0.7-1build1).
libaudit1 set to manually installed.
libavahi-client3 is already the newest version (0.8-5ubuntu5).
libavahi-client3 set to manually installed.
libavahi-common-data is already the newest version (0.8-5ubuntu5).
libavahi-common-data set to manually installed.
libavahi-common3 is already the newest version (0.8-5ubuntu5).
libavahi-common3 set to manually installed.
libavahi-glib1 is already the newest version (0.8-5ubuntu5).
libavahi-glib1 set to manually installed.
libavc1394-0 is already the newest version (0.5.4-5build2).
libavc1394-0 set to manually installed.
libblas3 is already the newest version (3.10.0-2ubuntu1).
libblas3 set to manually installed.
libblkid-dev is already the newest version (2.37.2-4ubuntu3).
libblkid-dev set to manually installed.
libblkid1 is already the newest version (2.37.2-4ubuntu3).
libblkid1 set to manually installed.
libblockdev-crypto2 is already the newest version (2.26-1).
libblockdev-crypto2 set to manually installed.
libblockdev-fs2 is already the newest version (2.26-1).
libblockdev-fs2 set to manually installed.
libblockdev-loop2 is already the newest version (2.26-1).
libblockdev-loop2 set to manually installed.
libblockdev-part-err2 is already the newest version (2.26-1).
libblockdev-part-err2 set to manually installed.
libblockdev-part2 is already the newest version (2.26-1).
libblockdev-part2 set to manually installed.
libblockdev-swap2 is already the newest version (2.26-1).
libblockdev-swap2 set to manually installed.
libblockdev-utils2 is already the newest version (2.26-1).
libblockdev-utils2 set to manually installed.
libblockdev2 is already the newest version (2.26-1).
libblockdev2 set to manually installed.
libbrotli-dev is already the newest version (1.0.9-2build6).
libbrotli-dev set to manually installed.
libbrotli1 is already the newest version (1.0.9-2build6).
libbrotli1 set to manually installed.
libbsd0 is already the newest version (0.11.5-1).
libbsd0 set to manually installed.
libbz2-1.0 is already the newest version (1.0.8-5build1).
libbz2-1.0 set to manually installed.
libcaca0 is already the newest version (0.99.beta19-2.2ubuntu4).
libcaca0 set to manually installed.
libcairo-gobject2 is already the newest version (1.16.0-5ubuntu2).
libcairo-gobject2 set to manually installed.
libcairo-script-interpreter2 is already the newest version (1.16.0-5ubuntu2).
libcairo-script-interpreter2 set to manually installed.
libcairo2 is already the newest version (1.16.0-5ubuntu2).
libcairo2 set to manually installed.
libcairo2-dev is already the newest version (1.16.0-5ubuntu2).
libcap-ng0 is already the newest version (0.7.9-2.2build3).
libcap-ng0 set to manually installed.
libcap2 is already the newest version (1:2.44-1build3).
libcap2 set to manually installed.
libcap2-bin is already the newest version (1:2.44-1build3).
libcap2-bin set to manually installed.
libcbor0.8 is already the newest version (0.8.0-2ubuntu1).
libcbor0.8 set to manually installed.
libcdio-cdda2 is already the newest version (10.2+2.0.0-1build3).
libcdio-cdda2 set to manually installed.
libcdio-paranoia2 is already the newest version (10.2+2.0.0-1build3).
libcdio-paranoia2 set to manually installed.
libcdio19 is already the newest version (2.1.0-3build1).
libcdio19 set to manually installed.
libcdparanoia0 is already the newest version (3.10.2+debian-14build2).
libcdparanoia0 set to manually installed.
libcolord2 is already the newest version (1.4.6-1).
libcolord2 set to manually installed.
libcrypt-dev is already the newest version (1:4.4.27-1).
libcrypt-dev set to manually installed.
libcrypt1 is already the newest version (1:4.4.27-1).
libcrypt1 set to manually installed.
libcue2 is already the newest version (2.2.1-3build3).
libcue2 set to manually installed.
libdatrie1 is already the newest version (0.2.13-2).
libdatrie1 set to manually installed.
libdb5.3 is already the newest version (5.3.28+dfsg1-0.8ubuntu3).
libdb5.3 set to manually installed.
libdbusmenu-glib4 is already the newest version (16.04.1+18.10.20180917-0ubuntu8).
libdbusmenu-glib4 set to manually installed.
libdconf1 is already the newest version (0.40.0-3).
libdconf1 set to manually installed.
libdebconfclient0 is already the newest version (0.261ubuntu1).
libdecor-0-0 is already the newest version (0.1.0-3build1).
libdecor-0-0 set to manually installed.
libdecor-0-plugin-1-cairo is already the newest version (0.1.0-3build1).
libdecor-0-plugin-1-cairo set to manually installed.
libdee-1.0-4 is already the newest version (1.2.7+17.10.20170616-6ubuntu4).
libdee-1.0-4 set to manually installed.
libdeflate0 is already the newest version (1.10-2).
libdeflate0 set to manually installed.
libdevmapper1.02.1 is already the newest version (2:1.02.175-2.1ubuntu4).
libdevmapper1.02.1 set to manually installed.
libdjvulibre-text is already the newest version (3.5.28-2build2).
libdjvulibre-text set to manually installed.
libdjvulibre21 is already the newest version (3.5.28-2build2).
libdjvulibre21 set to manually installed.
libdns-export1110 is already the newest version (1:9.11.19+dfsg-2.1ubuntu3).
libdns-export1110 set to manually installed.
libdv4 is already the newest version (1.0.0-14build1).
libdv4 set to manually installed.
libdw-dev is already the newest version (0.186-1build1).
libdw-dev set to manually installed.
libdw1 is already the newest version (0.186-1build1).
libdw1 set to manually installed.
libedit2 is already the newest version (3.1-20210910-1build1).
libedit2 set to manually installed.
libegl-dev is already the newest version (1.4.0-1).
libegl-dev set to manually installed.
libegl1 is already the newest version (1.4.0-1).
libegl1 set to manually installed.
libelf-dev is already the newest version (0.186-1build1).
libelf-dev set to manually installed.
libelf1 is already the newest version (0.186-1build1).
libelf1 set to manually installed.
libepoxy0 is already the newest version (1.5.10-1).
libepoxy0 set to manually installed.
liberror-perl is already the newest version (0.17029-1).
liberror-perl set to manually installed.
libestr0 is already the newest version (0.1.10-2.1build3).
libestr0 set to manually installed.
libevent-core-2.1-7 is already the newest version (2.1.12-stable-1build3).
libevent-core-2.1-7 set to manually installed.
libexif12 is already the newest version (0.6.24-1build1).
libexif12 set to manually installed.
libexiv2-27 is already the newest version (0.27.5-3ubuntu1).
libexiv2-27 set to manually installed.
libfakeroot is already the newest version (1.28-1ubuntu1).
libfakeroot set to manually installed.
libfastjson4 is already the newest version (0.99.9-1build2).
libfastjson4 set to manually installed.
libfdisk1 is already the newest version (2.37.2-4ubuntu3).
libfdisk1 set to manually installed.
libffi-dev is already the newest version (3.4.2-4).
libffi-dev set to manually installed.
libffi8 is already the newest version (3.4.2-4).
libffi8 set to manually installed.
libfftw3-double3 is already the newest version (3.3.8-2ubuntu8).
libfftw3-double3 set to manually installed.
libfftw3-single3 is already the newest version (3.3.8-2ubuntu8).
libfftw3-single3 set to manually installed.
libfido2-1 is already the newest version (1.10.0-1).
libfido2-1 set to manually installed.
libfile-fcntllock-perl is already the newest version (0.22-3build7).
libfile-fcntllock-perl set to manually installed.
libfl-dev is already the newest version (2.6.4-8build2).
libfl-dev set to manually installed.
libfl2 is already the newest version (2.6.4-8build2).
libfl2 set to manually installed.
libfontconfig-dev is already the newest version (2.13.1-4.2ubuntu5).
libfontconfig-dev set to manually installed.
libfontconfig1 is already the newest version (2.13.1-4.2ubuntu5).
libfontconfig1 set to manually installed.
libfontconfig1-dev is already the newest version (2.13.1-4.2ubuntu5).
libfontconfig1-dev set to manually installed.
libfuse3-3 is already the newest version (3.10.5-1build1).
libfuse3-3 set to manually installed.
libgc1 is already the newest version (1:8.0.6-1.1build1).
libgc1 set to manually installed.
libgck-1-0 is already the newest version (3.40.0-4).
libgck-1-0 set to manually installed.
libgcr-base-3-1 is already the newest version (3.40.0-4).
libgcr-base-3-1 set to manually installed.
libgcr-ui-3-1 is already the newest version (3.40.0-4).
libgcr-ui-3-1 set to manually installed.
libgcrypt20 is already the newest version (1.9.4-3ubuntu3).
libgcrypt20 set to manually installed.
libgd3 is already the newest version (2.3.0-2ubuntu2).
libgd3 set to manually installed.
libgdata-common is already the newest version (0.18.1-2build1).
libgdata-common set to manually installed.
libgdata22 is already the newest version (0.18.1-2build1).
libgdata22 set to manually installed.
libgdbm-compat4 is already the newest version (1.23-1).
libgdbm-compat4 set to manually installed.
libgdbm6 is already the newest version (1.23-1).
libgdbm6 set to manually installed.
libgexiv2-2 is already the newest version (0.14.0-1build1).
libgexiv2-2 set to manually installed.
libgif7 is already the newest version (5.1.9-2build2).
libgif7 set to manually installed.
libgirepository-1.0-1 is already the newest version (1.72.0-1).
libgirepository-1.0-1 set to manually installed.
libgirepository1.0-dev is already the newest version (1.72.0-1).
libgl-dev is already the newest version (1.4.0-1).
libgl-dev set to manually installed.
libgl1 is already the newest version (1.4.0-1).
libgl1 set to manually installed.
libgl1-amber-dri is already the newest version (21.3.7-0ubuntu1).
libgl1-amber-dri set to manually installed.
libgles-dev is already the newest version (1.4.0-1).
libgles-dev set to manually installed.
libgles1 is already the newest version (1.4.0-1).
libgles1 set to manually installed.
libgles2 is already the newest version (1.4.0-1).
libgles2 set to manually installed.
libglvnd0 is already the newest version (1.4.0-1).
libglvnd0 set to manually installed.
libglx-dev is already the newest version (1.4.0-1).
libglx-dev set to manually installed.
libglx0 is already the newest version (1.4.0-1).
libglx0 set to manually installed.
libgmp10 is already the newest version (2:6.2.1+dfsg-3ubuntu1).
libgmp10 set to manually installed.
libgnome-autoar-0-0 is already the newest version (0.4.3-1).
libgnome-autoar-0-0 set to manually installed.
libgoa-1.0-0b is already the newest version (3.44.0-1ubuntu1).
libgoa-1.0-0b set to manually installed.
libgoa-1.0-common is already the newest version (3.44.0-1ubuntu1).
libgoa-1.0-common set to manually installed.
libgpg-error0 is already the newest version (1.43-3).
libgpg-error0 set to manually installed.
libgpgme11 is already the newest version (1.16.0-1.2ubuntu4).
libgpgme11 set to manually installed.
libgphoto2-6 is already the newest version (2.5.27-1build2).
libgphoto2-6 set to manually installed.
libgphoto2-l10n is already the newest version (2.5.27-1build2).
libgphoto2-l10n set to manually installed.
libgphoto2-port12 is already the newest version (2.5.27-1build2).
libgphoto2-port12 set to manually installed.
libgpm2 is already the newest version (1.20.7-10build1).
libgpm2 set to manually installed.
libgraphene-1.0-0 is already the newest version (1.10.8-1).
libgraphene-1.0-0 set to manually installed.
libgraphite2-3 is already the newest version (1.3.14-1build2).
libgraphite2-3 set to manually installed.
libgsf-1-114 is already the newest version (1.14.47-1build2).
libgsf-1-114 set to manually installed.
libgsf-1-common is already the newest version (1.14.47-1build2).
libgsf-1-common set to manually installed.
libgstreamer-gl1.0-0 is already the newest version (1.20.1-1).
libgstreamer-gl1.0-0 set to manually installed.
libgstreamer-plugins-base1.0-0 is already the newest version (1.20.1-1).
libgstreamer-plugins-base1.0-0 set to manually installed.
libgstreamer-plugins-base1.0-dev is already the newest version (1.20.1-1).
libgudev-1.0-0 is already the newest version (1:237-2build1).
libgudev-1.0-0 set to manually installed.
libgudev-1.0-dev is already the newest version (1:237-2build1).
libgudev-1.0-dev set to manually installed.
libgxps2 is already the newest version (0.3.2-2).
libgxps2 set to manually installed.
libhandy-1-0 is already the newest version (1.6.1-1).
libhandy-1-0 set to manually installed.
libhogweed6 is already the newest version (3.7.3-1build2).
libhogweed6 set to manually installed.
libice-dev is already the newest version (2:1.0.10-1build2).
libice-dev set to manually installed.
libice6 is already the newest version (2:1.0.10-1build2).
libice6 set to manually installed.
libicu70 is already the newest version (70.1-2).
libicu70 set to manually installed.
libidn12 is already the newest version (1.38-4build1).
libidn12 set to manually installed.
libidn2-0 is already the newest version (2.3.2-2build1).
libidn2-0 set to manually installed.
libiec61883-0 is already the newest version (1.2.0-4build3).
libiec61883-0 set to manually installed.
libijs-0.35 is already the newest version (0.35-15build2).
libijs-0.35 set to manually installed.
libimobiledevice6 is already the newest version (1.3.0-6build3).
libimobiledevice6 set to manually installed.
libip4tc2 is already the newest version (1.8.7-1ubuntu5).
libip4tc2 set to manually installed.
libip6tc2 is already the newest version (1.8.7-1ubuntu5).
libip6tc2 set to manually installed.
libisc-export1105 is already the newest version (1:9.11.19+dfsg-2.1ubuntu3).
libisc-export1105 set to manually installed.
libisl23 is already the newest version (0.24-2build1).
libisl23 set to manually installed.
libjansson4 is already the newest version (2.13.1-1.1build3).
libjansson4 set to manually installed.
libjbig2dec0 is already the newest version (0.19-3build2).
libjbig2dec0 set to manually installed.
libjpeg-turbo8 is already the newest version (2.1.2-0ubuntu1).
libjpeg-turbo8 set to manually installed.
libjpeg8 is already the newest version (8c-2ubuntu10).
libjpeg8 set to manually installed.
libjs-jquery is already the newest version (3.6.0+dfsg+~3.5.13-1).
libjs-jquery set to manually installed.
libjs-sphinxdoc is already the newest version (4.3.2-1).
libjs-sphinxdoc set to manually installed.
libjs-underscore is already the newest version (1.13.2~dfsg-2).
libjs-underscore set to manually installed.
libjson-glib-1.0-0 is already the newest version (1.6.6-1build1).
libjson-glib-1.0-0 set to manually installed.
libjson-glib-1.0-common is already the newest version (1.6.6-1build1).
libjson-glib-1.0-common set to manually installed.
libkeyutils1 is already the newest version (1.6.1-2ubuntu3).
libkeyutils1 set to manually installed.
libkmod2 is already the newest version (29-1ubuntu1).
libkmod2 set to manually installed.
liblapack3 is already the newest version (3.10.0-2ubuntu1).
liblapack3 set to manually installed.
liblcms2-2 is already the newest version (2.12~rc1-2build2).
liblcms2-2 set to manually installed.
liblmdb0 is already the newest version (0.9.24-1build2).
liblmdb0 set to manually installed.
liblocale-gettext-perl is already the newest version (1.07-4build3).
liblocale-gettext-perl set to manually installed.
libltdl7 is already the newest version (2.4.6-15build2).
libltdl7 set to manually installed.
liblz4-1 is already the newest version (1.9.3-2build2).
liblz4-1 set to manually installed.
liblzma-dev is already the newest version (5.2.5-2ubuntu1).
liblzma-dev set to manually installed.
liblzma5 is already the newest version (5.2.5-2ubuntu1).
liblzma5 set to manually installed.
liblzo2-2 is already the newest version (2.10-2build3).
liblzo2-2 set to manually installed.
libmagic-mgc is already the newest version (1:5.41-3).
libmagic-mgc set to manually installed.
libmagic1 is already the newest version (1:5.41-3).
libmagic1 set to manually installed.
libmaxminddb0 is already the newest version (1.5.2-1build2).
libmaxminddb0 set to manually installed.
libmd0 is already the newest version (1.0.4-1build1).
libmd0 set to manually installed.
libmnl0 is already the newest version (1.0.4-3build2).
libmnl0 set to manually installed.
libmount-dev is already the newest version (2.37.2-4ubuntu3).
libmount-dev set to manually installed.
libmount1 is already the newest version (2.37.2-4ubuntu3).
libmount1 set to manually installed.
libmp3lame0 is already the newest version (3.100-3build2).
libmp3lame0 set to manually installed.
libmpc3 is already the newest version (1.2.1-2build1).
libmpc3 set to manually installed.
libmpdec3 is already the newest version (2.5.1-2build2).
libmpdec3 set to manually installed.
libmpfr6 is already the newest version (4.1.0-3build3).
libmpfr6 set to manually installed.
libmpg123-0 is already the newest version (1.29.3-1build1).
libmpg123-0 set to manually installed.
libmtp-common is already the newest version (1.1.19-1build1).
libmtp-common set to manually installed.
libmtp-runtime is already the newest version (1.1.19-1build1).
libmtp-runtime set to manually installed.
libmtp9 is already the newest version (1.1.19-1build1).
libmtp9 set to manually installed.
libncurses6 is already the newest version (6.3-2).
libncurses6 set to manually installed.
libncursesw6 is already the newest version (6.3-2).
libncursesw6 set to manually installed.
libnetfilter-conntrack3 is already the newest version (1.0.9-1).
libnetfilter-conntrack3 set to manually installed.
libnettle8 is already the newest version (3.7.3-1build2).
libnettle8 set to manually installed.
libnewt0.52 is already the newest version (0.52.21-5ubuntu2).
libnewt0.52 set to manually installed.
libnfnetlink0 is already the newest version (1.0.1-3build3).
libnfnetlink0 set to manually installed.
libnfs13 is already the newest version (4.0.0-1build2).
libnfs13 set to manually installed.
libnftnl11 is already the newest version (1.2.1-1build1).
libnftnl11 set to manually installed.
libnghttp2-14 is already the newest version (1.43.0-1build3).
libnghttp2-14 set to manually installed.
libnl-3-200 is already the newest version (3.5.0-0.1).
libnl-3-200 set to manually installed.
libnl-genl-3-200 is already the newest version (3.5.0-0.1).
libnl-genl-3-200 set to manually installed.
libnpth0 is already the newest version (1.6-3build2).
libnpth0 set to manually installed.
libnsl-dev is already the newest version (1.3.0-2build2).
libnsl-dev set to manually installed.
libnsl2 is already the newest version (1.3.0-2build2).
libnsl2 set to manually installed.
libnspr4 is already the newest version (2:4.32-3build1).
libnspr4 set to manually installed.
libnuma1 is already the newest version (2.0.14-3ubuntu2).
libnuma1 set to manually installed.
libogg0 is already the newest version (1.3.5-0ubuntu3).
libogg0 set to manually installed.
libopenjp2-7 is already the newest version (2.4.0-6).
libopenjp2-7 set to manually installed.
libopus0 is already the newest version (1.3.1-0.1build2).
libopus0 set to manually installed.
liborc-0.4-0 is already the newest version (1:0.4.32-2).
liborc-0.4-0 set to manually installed.
liborc-0.4-dev is already the newest version (1:0.4.32-2).
liborc-0.4-dev set to manually installed.
liborc-0.4-dev-bin is already the newest version (1:0.4.32-2).
liborc-0.4-dev-bin set to manually installed.
libp11-kit0 is already the newest version (0.24.0-6build1).
libp11-kit0 set to manually installed.
libpackagekit-glib2-18 is already the newest version (1.2.5-2ubuntu2).
libpackagekit-glib2-18 set to manually installed.
libpam-cap is already the newest version (1:2.44-1build3).
libpam-cap set to manually installed.
libpaper-utils is already the newest version (1.1.28build2).
libpaper-utils set to manually installed.
libpaper1 is already the newest version (1.1.28build2).
libpaper1 set to manually installed.
libparted-fs-resize0 is already the newest version (3.4-2build1).
libparted-fs-resize0 set to manually installed.
libparted2 is already the newest version (3.4-2build1).
libparted2 set to manually installed.
libpcap0.8 is already the newest version (1.10.1-4build1).
libpcap0.8 set to manually installed.
libpci3 is already the newest version (1:3.7.0-6).
libpci3 set to manually installed.
libpciaccess-dev is already the newest version (0.16-3).
libpciaccess-dev set to manually installed.
libpciaccess0 is already the newest version (0.16-3).
libpciaccess0 set to manually installed.
libpipeline1 is already the newest version (1.5.5-1).
libpipeline1 set to manually installed.
libplist3 is already the newest version (2.2.0-6build2).
libplist3 set to manually installed.
libplymouth5 is already the newest version (0.9.5+git20211018-1ubuntu3).
libplymouth5 set to manually installed.
libpng-dev is already the newest version (1.6.37-3build5).
libpng-dev set to manually installed.
libpng-tools is already the newest version (1.6.37-3build5).
libpng-tools set to manually installed.
libpng16-16 is already the newest version (1.6.37-3build5).
libpng16-16 set to manually installed.
libpolkit-agent-1-0 is already the newest version (0.105-33).
libpolkit-agent-1-0 set to manually installed.
libpolkit-gobject-1-0 is already the newest version (0.105-33).
libpolkit-gobject-1-0 set to manually installed.
libpopt0 is already the newest version (1.18-3build1).
libpopt0 set to manually installed.
libprocps8 is already the newest version (2:3.3.17-6ubuntu2).
libprocps8 set to manually installed.
libproxy1v5 is already the newest version (0.4.17-2).
libproxy1v5 set to manually installed.
libpsl5 is already the newest version (0.21.0-1.2build2).
libpsl5 set to manually installed.
libpthread-stubs0-dev is already the newest version (0.4-1build2).
libpthread-stubs0-dev set to manually installed.
librabbitmq4 is already the newest version (0.10.0-1ubuntu2).
librabbitmq4 set to manually installed.
libraw1394-11 is already the newest version (2.1.2-2build2).
libraw1394-11 set to manually installed.
libreadline8 is already the newest version (8.1.2-1).
libreadline8 set to manually installed.
librsvg2-2 is already the newest version (2.52.5+dfsg-3).
librsvg2-2 set to manually installed.
librsvg2-common is already the newest version (2.52.5+dfsg-3).
librsvg2-common set to manually installed.
librtmp1 is already the newest version (2.4+20151223.gitfa8646d.1-2build4).
librtmp1 set to manually installed.
libsamplerate0 is already the newest version (0.2.2-1build1).
libsamplerate0 set to manually installed.
libseccomp2 is already the newest version (2.5.3-2ubuntu2).
libseccomp2 set to manually installed.
libsecret-1-0 is already the newest version (0.20.5-2).
libsecret-1-0 set to manually installed.
libsecret-common is already the newest version (0.20.5-2).
libsecret-common set to manually installed.
libselinux1 is already the newest version (3.3-1build2).
libselinux1 set to manually installed.
libselinux1-dev is already the newest version (3.3-1build2).
libselinux1-dev set to manually installed.
libsemanage-common is already the newest version (3.3-1build2).
libsemanage-common set to manually installed.
libsemanage2 is already the newest version (3.3-1build2).
libsemanage2 set to manually installed.
libsensors-config is already the newest version (1:3.6.0-7ubuntu1).
libsensors-config set to manually installed.
libsensors5 is already the newest version (1:3.6.0-7ubuntu1).
libsensors5 set to manually installed.
libsepol-dev is already the newest version (3.3-1build1).
libsepol-dev set to manually installed.
libsepol2 is already the newest version (3.3-1build1).
libsepol2 set to manually installed.
libshout3 is already the newest version (2.4.5-1build3).
libshout3 set to manually installed.
libsigsegv2 is already the newest version (2.13-1ubuntu3).
libsigsegv2 set to manually installed.
libslang2 is already the newest version (2.3.2-5build4).
libslang2 set to manually installed.
libslirp0 is already the newest version (4.6.1-1build1).
libslirp0 set to manually installed.
libsm-dev is already the newest version (2:1.2.3-1build2).
libsm-dev set to manually installed.
libsm6 is already the newest version (2:1.2.3-1build2).
libsm6 set to manually installed.
libsmartcols1 is already the newest version (2.37.2-4ubuntu3).
libsmartcols1 set to manually installed.
libsnappy1v5 is already the newest version (1.1.8-1build3).
libsnappy1v5 set to manually installed.
libsndfile1 is already the newest version (1.0.31-2build1).
libsndfile1 set to manually installed.
libsodium23 is already the newest version (1.0.18-1build2).
libsodium23 set to manually installed.
libsoup2.4-1 is already the newest version (2.74.2-3).
libsoup2.4-1 set to manually installed.
libsoup2.4-common is already the newest version (2.74.2-3).
libsoup2.4-common set to manually installed.
libsoxr0 is already the newest version (0.1.3-4build2).
libsoxr0 set to manually installed.
libspeex1 is already the newest version (1.2~rc1.2-1.1ubuntu3).
libspeex1 set to manually installed.
libssh-4 is already the newest version (0.9.6-2build1).
libssh-4 set to manually installed.
libssh-gcrypt-4 is already the newest version (0.9.6-2build1).
libssh-gcrypt-4 set to manually installed.
libstemmer0d is already the newest version (2.2.0-1build1).
libstemmer0d set to manually installed.
libtag1v5 is already the newest version (1.11.1+dfsg.1-3ubuntu3).
libtag1v5 set to manually installed.
libtag1v5-vanilla is already the newest version (1.11.1+dfsg.1-3ubuntu3).
libtag1v5-vanilla set to manually installed.
libtalloc2 is already the newest version (2.3.3-2build1).
libtalloc2 set to manually installed.
libtasn1-6 is already the newest version (4.18.0-4build1).
libtasn1-6 set to manually installed.
libtdb1 is already the newest version (1.4.5-2build1).
libtdb1 set to manually installed.
libtevent0 is already the newest version (0.11.0-1build1).
libtevent0 set to manually installed.
libtext-charwidth-perl is already the newest version (0.04-10build3).
libtext-charwidth-perl set to manually installed.
libtext-iconv-perl is already the newest version (1.7-7build3).
libtext-iconv-perl set to manually installed.
libtext-wrapi18n-perl is already the newest version (0.06-9).
libtext-wrapi18n-perl set to manually installed.
libthai-data is already the newest version (0.1.29-1build1).
libthai-data set to manually installed.
libthai0 is already the newest version (0.1.29-1build1).
libthai0 set to manually installed.
libtheora0 is already the newest version (1.1.1+dfsg.1-15ubuntu4).
libtheora0 set to manually installed.
libtinfo6 is already the newest version (6.3-2).
libtinfo6 set to manually installed.
libtotem-plparser-common is already the newest version (3.26.6-1build1).
libtotem-plparser-common set to manually installed.
libtotem-plparser18 is already the newest version (3.26.6-1build1).
libtotem-plparser18 set to manually installed.
libtracker-sparql-3.0-0 is already the newest version (3.3.0-1).
libtracker-sparql-3.0-0 set to manually installed.
libtwolame0 is already the newest version (0.4.0-2build2).
libtwolame0 set to manually installed.
libuchardet0 is already the newest version (0.0.7-1build2).
libuchardet0 set to manually installed.
libudisks2-0 is already the newest version (2.9.4-1ubuntu2).
libudisks2-0 set to manually installed.
libunistring2 is already the newest version (1.0-1).
libunistring2 set to manually installed.
libunity-protocol-private0 is already the newest version (7.1.4+19.04.20190319-6build1).
libunity-protocol-private0 set to manually installed.
libunity-scopes-json-def-desktop is already the newest version (7.1.4+19.04.20190319-6build1).
libunity-scopes-json-def-desktop set to manually installed.
libunity9 is already the newest version (7.1.4+19.04.20190319-6build1).
libunity9 set to manually installed.
libunwind-dev is already the newest version (1.3.2-2build2).
libunwind-dev set to manually installed.
libunwind8 is already the newest version (1.3.2-2build2).
libunwind8 set to manually installed.
libupower-glib3 is already the newest version (0.99.17-1).
libupower-glib3 set to manually installed.
libusbmuxd6 is already the newest version (2.0.2-3build2).
libusbmuxd6 set to manually installed.
libutempter0 is already the newest version (1.2.1-2build2).
libutempter0 set to manually installed.
libuuid1 is already the newest version (2.37.2-4ubuntu3).
libuuid1 set to manually installed.
libuv1 is already the newest version (1.43.0-1).
libuv1 set to manually installed.
libv4l-0 is already the newest version (1.22.1-2build1).
libv4l-0 set to manually installed.
libv4lconvert0 is already the newest version (1.22.1-2build1).
libv4lconvert0 set to manually installed.
libvdpau1 is already the newest version (1.4-3build2).
libvdpau1 set to manually installed.
libvisual-0.4-0 is already the newest version (0.4.0-17build2).
libvisual-0.4-0 set to manually installed.
libvolume-key1 is already the newest version (0.3.12-3.1build3).
libvolume-key1 set to manually installed.
libvorbis0a is already the newest version (1.3.7-1build2).
libvorbis0a set to manually installed.
libvorbisenc2 is already the newest version (1.3.7-1build2).
libvorbisenc2 set to manually installed.
libvorbisfile3 is already the newest version (1.3.7-1build2).
libvorbisfile3 set to manually installed.
libvpx7 is already the newest version (1.11.0-2ubuntu2).
libvpx7 set to manually installed.
libwavpack1 is already the newest version (5.4.0-1build2).
libwavpack1 set to manually installed.
libwebp7 is already the newest version (1.2.2-2).
libwebp7 set to manually installed.
libwebpdemux2 is already the newest version (1.2.2-2).
libwebpdemux2 set to manually installed.
libwebpmux3 is already the newest version (1.2.2-2).
libwebpmux3 set to manually installed.
libwmflite-0.2-7 is already the newest version (0.2.12-5ubuntu1).
libwmflite-0.2-7 set to manually installed.
libx11-6 is already the newest version (2:1.7.5-1).
libx11-6 set to manually installed.
libx11-data is already the newest version (2:1.7.5-1).
libx11-data set to manually installed.
libx11-dev is already the newest version (2:1.7.5-1).
libx11-dev set to manually installed.
libx11-xcb-dev is already the newest version (2:1.7.5-1).
libx11-xcb-dev set to manually installed.
libx11-xcb1 is already the newest version (2:1.7.5-1).
libx11-xcb1 set to manually installed.
libxau-dev is already the newest version (1:1.0.9-1build5).
libxau-dev set to manually installed.
libxau6 is already the newest version (1:1.0.9-1build5).
libxau6 set to manually installed.
libxcb-dri2-0 is already the newest version (1.14-3ubuntu3).
libxcb-dri2-0 set to manually installed.
libxcb-dri3-0 is already the newest version (1.14-3ubuntu3).
libxcb-dri3-0 set to manually installed.
libxcb-glx0 is already the newest version (1.14-3ubuntu3).
libxcb-glx0 set to manually installed.
libxcb-present0 is already the newest version (1.14-3ubuntu3).
libxcb-present0 set to manually installed.
libxcb-render0 is already the newest version (1.14-3ubuntu3).
libxcb-render0 set to manually installed.
libxcb-render0-dev is already the newest version (1.14-3ubuntu3).
libxcb-render0-dev set to manually installed.
libxcb-shape0 is already the newest version (1.14-3ubuntu3).
libxcb-shape0 set to manually installed.
libxcb-shm0 is already the newest version (1.14-3ubuntu3).
libxcb-shm0 set to manually installed.
libxcb-shm0-dev is already the newest version (1.14-3ubuntu3).
libxcb-shm0-dev set to manually installed.
libxcb-sync1 is already the newest version (1.14-3ubuntu3).
libxcb-sync1 set to manually installed.
libxcb-xfixes0 is already the newest version (1.14-3ubuntu3).
libxcb-xfixes0 set to manually installed.
libxcb1 is already the newest version (1.14-3ubuntu3).
libxcb1 set to manually installed.
libxcb1-dev is already the newest version (1.14-3ubuntu3).
libxcb1-dev set to manually installed.
libxcomposite1 is already the newest version (1:0.4.5-1build2).
libxcomposite1 set to manually installed.
libxcursor1 is already the newest version (1:1.2.0-2build4).
libxcursor1 set to manually installed.
libxdamage1 is already the newest version (1:1.1.5-2build2).
libxdamage1 set to manually installed.
libxdmcp-dev is already the newest version (1:1.1.3-0ubuntu5).
libxdmcp-dev set to manually installed.
libxdmcp6 is already the newest version (1:1.1.3-0ubuntu5).
libxdmcp6 set to manually installed.
libxext-dev is already the newest version (2:1.3.4-1build1).
libxext-dev set to manually installed.
libxext6 is already the newest version (2:1.3.4-1build1).
libxext6 set to manually installed.
libxfixes3 is already the newest version (1:6.0.0-1).
libxfixes3 set to manually installed.
libxft2 is already the newest version (2.3.4-1).
libxft2 set to manually installed.
libxi6 is already the newest version (2:1.8-1build1).
libxi6 set to manually installed.
libxinerama1 is already the newest version (2:1.1.4-3).
libxinerama1 set to manually installed.
libxkbcommon0 is already the newest version (1.4.0-1).
libxkbcommon0 set to manually installed.
libxkbregistry0 is already the newest version (1.4.0-1).
libxkbregistry0 set to manually installed.
libxmlb2 is already the newest version (0.3.6-2build1).
libxmlb2 set to manually installed.
libxmuu1 is already the newest version (2:1.1.3-3).
libxmuu1 set to manually installed.
libxrandr2 is already the newest version (2:1.5.2-1build1).
libxrandr2 set to manually installed.
libxrender-dev is already the newest version (1:0.9.10-1build4).
libxrender-dev set to manually installed.
libxrender1 is already the newest version (1:0.9.10-1build4).
libxrender1 set to manually installed.
libxshmfence1 is already the newest version (1.3-1build4).
libxshmfence1 set to manually installed.
libxss1 is already the newest version (1:1.2.3-1build2).
libxss1 set to manually installed.
libxtables12 is already the newest version (1.8.7-1ubuntu5).
libxtables12 set to manually installed.
libxtst6 is already the newest version (2:1.2.3-1build4).
libxtst6 set to manually installed.
libxv1 is already the newest version (2:1.0.11-1build2).
libxv1 set to manually installed.
libxxf86vm1 is already the newest version (1:1.1.4-1build3).
libxxf86vm1 set to manually installed.
libxxhash0 is already the newest version (0.8.1-1).
libxxhash0 set to manually installed.
libyaml-0-2 is already the newest version (0.2.2-1build2).
libyaml-0-2 set to manually installed.
libzstd1 is already the newest version (1.4.8+dfsg-3build1).
libzstd1 set to manually installed.
lsb-base is already the newest version (11.1.0ubuntu4).
lsb-base set to manually installed.
lsb-release is already the newest version (11.1.0ubuntu4).
lsb-release set to manually installed.
lshw is already the newest version (02.19.git.2021.06.19.996aaad9c7-2build1).
lshw set to manually installed.
lsof is already the newest version (4.93.2+dfsg-1.1build2).
lsof set to manually installed.
lto-disabled-list is already the newest version (24).
lto-disabled-list set to manually installed.
m4 is already the newest version (1.4.18-5ubuntu2).
m4 set to manually installed.
make is already the newest version (4.3-4.1build1).
make set to manually installed.
man-db is already the newest version (2.10.2-1).
man-db set to manually installed.
manpages is already the newest version (5.10-1ubuntu1).
manpages set to manually installed.
manpages-dev is already the newest version (5.10-1ubuntu1).
manpages-dev set to manually installed.
mawk is already the newest version (1.3.4.20200120-3).
mawk set to manually installed.
media-types is already the newest version (7.0.0).
media-types set to manually installed.
mount is already the newest version (2.37.2-4ubuntu3).
mount set to manually installed.
mtr-tiny is already the newest version (0.95-1).
mtr-tiny set to manually installed.
mysql-common is already the newest version (5.8+1.0.8).
mysql-common set to manually installed.
nano is already the newest version (6.2-1).
nano set to manually installed.
ncurses-base is already the newest version (6.3-2).
ncurses-bin is already the newest version (6.3-2).
netbase is already the newest version (6.3).
netbase set to manually installed.
netcat-openbsd is already the newest version (1.218-4ubuntu1).
netcat-openbsd set to manually installed.
p11-kit is already the newest version (0.24.0-6build1).
p11-kit set to manually installed.
p11-kit-modules is already the newest version (0.24.0-6build1).
p11-kit-modules set to manually installed.
packagekit is already the newest version (1.2.5-2ubuntu2).
packagekit set to manually installed.
packagekit-tools is already the newest version (1.2.5-2ubuntu2).
packagekit-tools set to manually installed.
parted is already the newest version (3.4-2build1).
parted set to manually installed.
pastebinit is already the newest version (1.5.1-1ubuntu1).
pastebinit set to manually installed.
patch is already the newest version (2.7.6-7build2).
patch set to manually installed.
pci.ids is already the newest version (0.0~2022.01.22-1).
pci.ids set to manually installed.
pciutils is already the newest version (1:3.7.0-6).
pciutils set to manually installed.
pinentry-curses is already the newest version (1.1.1-1build2).
pinentry-curses set to manually installed.
pinentry-gnome3 is already the newest version (1.1.1-1build2).
pinentry-gnome3 set to manually installed.
pkexec is already the newest version (0.105-33).
pkexec set to manually installed.
pkg-config is already the newest version (0.29.2-1ubuntu3).
plymouth is already the newest version (0.9.5+git20211018-1ubuntu3).
plymouth set to manually installed.
plymouth-theme-ubuntu-text is already the newest version (0.9.5+git20211018-1ubuntu3).
plymouth-theme-ubuntu-text set to manually installed.
policykit-1 is already the newest version (0.105-33).
policykit-1 set to manually installed.
polkitd is already the newest version (0.105-33).
polkitd set to manually installed.
poppler-data is already the newest version (0.4.11-1).
poppler-data set to manually installed.
powermgmt-base is already the newest version (1.36).
powermgmt-base set to manually installed.
procps is already the newest version (2:3.3.17-6ubuntu2).
procps set to manually installed.
psmisc is already the newest version (23.4-2build3).
psmisc set to manually installed.
publicsuffix is already the newest version (20211207.1025-1).
publicsuffix set to manually installed.
python3-attr is already the newest version (21.2.0-1).
python3-attr set to manually installed.
python3-blinker is already the newest version (1.4+dfsg1-0.4).
python3-blinker set to manually installed.
python3-certifi is already the newest version (2020.6.20-1).
python3-certifi set to manually installed.
python3-cffi-backend is already the newest version (1.15.0-1build2).
python3-cffi-backend set to manually installed.
python3-chardet is already the newest version (4.0.0-1).
python3-chardet set to manually installed.
python3-commandnotfound is already the newest version (22.04.0).
python3-commandnotfound set to manually installed.
python3-cryptography is already the newest version (3.4.8-1ubuntu2).
python3-cryptography set to manually installed.
python3-dbus is already the newest version (1.2.18-3build1).
python3-dbus set to manually installed.
python3-distro is already the newest version (1.7.0-1).
python3-distro set to manually installed.
python3-distro-info is already the newest version (1.1build1).
python3-distro-info set to manually installed.
python3-httplib2 is already the newest version (0.20.2-2).
python3-httplib2 set to manually installed.
python3-idna is already the newest version (3.3-1).
python3-idna set to manually installed.
python3-importlib-metadata is already the newest version (4.6.4-1).
python3-importlib-metadata set to manually installed.
python3-jeepney is already the newest version (0.7.1-3).
python3-jeepney set to manually installed.
python3-jsonschema is already the newest version (3.2.0-0ubuntu2).
python3-jsonschema set to manually installed.
python3-keyring is already the newest version (23.5.0-1).
python3-keyring set to manually installed.
python3-launchpadlib is already the newest version (1.10.16-1).
python3-launchpadlib set to manually installed.
python3-lazr.restfulclient is already the newest version (0.14.4-1).
python3-lazr.restfulclient set to manually installed.
python3-lazr.uri is already the newest version (1.0.6-2).
python3-lazr.uri set to manually installed.
python3-markdown is already the newest version (3.3.6-1).
python3-markdown set to manually installed.
python3-markupsafe is already the newest version (2.0.1-2build1).
python3-markupsafe set to manually installed.
python3-more-itertools is already the newest version (8.10.0-2).
python3-more-itertools set to manually installed.
python3-netifaces is already the newest version (0.11.0-1build2).
python3-netifaces set to manually installed.
python3-newt is already the newest version (0.52.21-5ubuntu2).
python3-newt set to manually installed.
python3-pygments is already the newest version (2.11.2+dfsg-2).
python3-pygments set to manually installed.
python3-pyparsing is already the newest version (2.4.7-1).
python3-pyparsing set to manually installed.
python3-pyrsistent is already the newest version (0.18.1-1build1).
python3-pyrsistent set to manually installed.
python3-requests is already the newest version (2.25.1+dfsg-2).
python3-requests set to manually installed.
python3-secretstorage is already the newest version (3.3.1-1).
python3-secretstorage set to manually installed.
python3-six is already the newest version (1.16.0-3ubuntu1).
python3-six set to manually installed.
python3-systemd is already the newest version (234-3ubuntu2).
python3-systemd set to manually installed.
python3-talloc is already the newest version (2.3.3-2build1).
python3-talloc set to manually installed.
python3-urllib3 is already the newest version (1.26.5-1~exp1).
python3-urllib3 set to manually installed.
python3-wadllib is already the newest version (1.3.6-1).
python3-wadllib set to manually installed.
python3-yaml is already the newest version (5.4.1-1ubuntu1).
python3-yaml set to manually installed.
python3-zipp is already the newest version (1.0.0-3).
python3-zipp set to manually installed.
readline-common is already the newest version (8.1.2-1).
readline-common set to manually installed.
rpcsvc-proto is already the newest version (1.4.2-0ubuntu6).
rpcsvc-proto set to manually installed.
run-one is already the newest version (1.17-0ubuntu1).
run-one set to manually installed.
screen is already the newest version (4.9.0-1).
screen set to manually installed.
sed is already the newest version (4.8-1ubuntu2).
sed set to manually installed.
sensible-utils is already the newest version (0.0.17).
sensible-utils set to manually installed.
session-migration is already the newest version (0.3.6).
session-migration set to manually installed.
shared-mime-info is already the newest version (2.1-2).
shared-mime-info set to manually installed.
show-motd is already the newest version (3.10).
show-motd set to manually installed.
squashfs-tools is already the newest version (1:4.5-3build1).
squashfs-tools set to manually installed.
ssl-cert is already the newest version (1.1.2).
ssl-cert set to manually installed.
strace is already the newest version (5.16-0ubuntu3).
strace set to manually installed.
sysvinit-utils is already the newest version (3.01-1ubuntu1).
telnet is already the newest version (0.17-44build1).
telnet set to manually installed.
time is already the newest version (1.9-0.1build2).
time set to manually installed.
tnftp is already the newest version (20210827-4build1).
tnftp set to manually installed.
tracker is already the newest version (3.3.0-1).
tracker set to manually installed.
tracker-extract is already the newest version (3.3.0-1).
tracker-extract set to manually installed.
tracker-miner-fs is already the newest version (3.3.0-1).
tracker-miner-fs set to manually installed.
ubuntu-keyring is already the newest version (2021.03.26).
ubuntu-keyring set to manually installed.
ubuntu-minimal is already the newest version (1.481).
ubuntu-mono is already the newest version (20.10-0ubuntu2).
ubuntu-mono set to manually installed.
ubuntu-standard is already the newest version (1.481).
ubuntu-wsl is already the newest version (1.481).
ucf is already the newest version (3.0043).
ucf set to manually installed.
udisks2 is already the newest version (2.9.4-1ubuntu2).
udisks2 set to manually installed.
ufw is already the newest version (0.36.1-4build1).
ufw set to manually installed.
unattended-upgrades is already the newest version (2.8ubuntu1).
unattended-upgrades set to manually installed.
update-motd is already the newest version (3.10).
update-motd set to manually installed.
upower is already the newest version (0.99.17-1).
upower set to manually installed.
usb.ids is already the newest version (2022.04.02-1).
usb.ids set to manually installed.
usbmuxd is already the newest version (1.1.1-2build2).
usbmuxd set to manually installed.
usbutils is already the newest version (1:014-1build1).
usbutils set to manually installed.
usrmerge is already the newest version (25ubuntu2).
usrmerge set to manually installed.
util-linux is already the newest version (2.37.2-4ubuntu3).
util-linux set to manually installed.
uuid-dev is already the newest version (2.37.2-4ubuntu3).
uuid-dev set to manually installed.
uuid-runtime is already the newest version (2.37.2-4ubuntu3).
uuid-runtime set to manually installed.
vdpau-driver-all is already the newest version (1.4-3build2).
vdpau-driver-all set to manually installed.
wget is already the newest version (1.21.2-2ubuntu1).
wget set to manually installed.
whiptail is already the newest version (0.52.21-5ubuntu2).
whiptail set to manually installed.
wsl-setup is already the newest version (0.2).
wsl-setup set to manually installed.
x11-common is already the newest version (1:7.7+23ubuntu2).
x11-common set to manually installed.
x11proto-dev is already the newest version (2021.5-1).
x11proto-dev set to manually installed.
xauth is already the newest version (1:1.1-1build2).
xauth set to manually installed.
xdg-user-dirs is already the newest version (0.17-2ubuntu4).
xdg-user-dirs set to manually installed.
xkb-data is already the newest version (2.33-1).
xkb-data set to manually installed.
xorg-sgml-doctools is already the newest version (1:1.11-1.1).
xorg-sgml-doctools set to manually installed.
xtrans-dev is already the newest version (1.4.0-1).
xtrans-dev set to manually installed.
xz-utils is already the newest version (5.2.5-2ubuntu1).
xz-utils set to manually installed.
buildah is already the newest version (1.23.1+ds1-2).
buildah set to manually installed.
catatonit is already the newest version (0.1.7-1).
catatonit set to manually installed.
conmon is already the newest version (2.0.25+ds1-1.1).
conmon set to manually installed.
containernetworking-plugins is already the newest version (0.9.1+ds1-1).
containernetworking-plugins set to manually installed.
docker-compose is already the newest version (1.29.2-1).
docker-compose set to manually installed.
dos2unix is already the newest version (7.4.2-2).
fuse-overlayfs is already the newest version (1.7.1-1).
fuse-overlayfs set to manually installed.
golang-github-containernetworking-plugin-dnsname is already the newest version (1.3.1+ds1-2).
golang-github-containernetworking-plugin-dnsname set to manually installed.
golang-github-containers-common is already the newest version (0.44.4+ds1-1).
golang-github-containers-common set to manually installed.
golang-github-containers-image is already the newest version (5.16.0-3).
golang-github-containers-image set to manually installed.
gsasl-common is already the newest version (1.10.0-5).
gsasl-common set to manually installed.
gsfonts is already the newest version (1:8.11+urwcyr1.0.7~pre44-4.5).
gsfonts set to manually installed.
guile-3.0-libs is already the newest version (3.0.7-1).
guile-3.0-libs set to manually installed.
i965-va-driver is already the newest version (2.4.1+dfsg1-1).
i965-va-driver set to manually installed.
jupyter-core is already the newest version (4.9.1-1).
libaacs0 is already the newest version (0.11.1-1).
libaacs0 set to manually installed.
libaom3 is already the newest version (3.3.0-1).
libaom3 set to manually installed.
libass9 is already the newest version (1:0.15.2-1).
libass9 set to manually installed.
libbdplus0 is already the newest version (0.2.0-1).
libbdplus0 set to manually installed.
libbluray2 is already the newest version (1:1.3.1-1).
libbluray2 set to manually installed.
libbs2b0 is already the newest version (3.1.0+dfsg-2.2build1).
libbs2b0 set to manually installed.
libchromaprint1 is already the newest version (1.5.1-2).
libchromaprint1 set to manually installed.
libcodec2-1.0 is already the newest version (1.0.1-3).
libcodec2-1.0 set to manually installed.
libdav1d5 is already the newest version (0.9.2-1).
libdav1d5 set to manually installed.
libdc1394-25 is already the newest version (2.2.6-4).
libdc1394-25 set to manually installed.
libde265-0 is already the newest version (1.0.8-1).
libde265-0 set to manually installed.
libflite1 is already the newest version (2.2-3).
libflite1 set to manually installed.
libgme0 is already the newest version (0.6.3-2).
libgme0 set to manually installed.
libgsasl7 is already the newest version (1.10.0-5).
libgsasl7 set to manually installed.
libgsm1 is already the newest version (1.0.19-1).
libgsm1 set to manually installed.
libheif1 is already the newest version (1.12.0-2build1).
libheif1 set to manually installed.
libigdgmm12 is already the newest version (22.1.2+ds1-1).
libigdgmm12 set to manually installed.
libilmbase25 is already the newest version (2.5.7-2).
libilmbase25 set to manually installed.
libjack-dev is already the newest version (1:0.125.0-3build2).
libjack-dev set to manually installed.
libjack0 is already the newest version (1:0.125.0-3build2).
libjack0 set to manually installed.
libjxr-tools is already the newest version (1.2~git20170615.f752187-5).
libjxr-tools set to manually installed.
libjxr0 is already the newest version (1.2~git20170615.f752187-5).
libjxr0 set to manually installed.
liblilv-0-0 is already the newest version (0.24.12-2).
liblilv-0-0 set to manually installed.
liblqr-1-0 is already the newest version (0.4.2-2.1).
liblqr-1-0 set to manually installed.
libmailutils8 is already the newest version (1:3.14-1).
libmailutils8 set to manually installed.
libmfx1 is already the newest version (22.3.0-1).
libmfx1 set to manually installed.
libmysofa1 is already the newest version (1.2.1~dfsg0-1).
libmysofa1 set to manually installed.
libnetpbm10 is already the newest version (2:10.0-15.4).
libnetpbm10 set to manually installed.
libnorm1 is already the newest version (1.5.9+dfsg-2).
libnorm1 set to manually installed.
libntlm0 is already the newest version (1.6-4).
libntlm0 set to manually installed.
libopenal-data is already the newest version (1:1.19.1-2build3).
libopenal-data set to manually installed.
libopenal1 is already the newest version (1:1.19.1-2build3).
libopenal1 set to manually installed.
libopenexr25 is already the newest version (2.5.7-1).
libopenexr25 set to manually installed.
libopenmpt0 is already the newest version (0.6.1-1).
libopenmpt0 set to manually installed.
libostree-1-1 is already the newest version (2022.2-3).
libostree-1-1 set to manually installed.
libpgm-5.3-0 is already the newest version (5.3.128~dfsg-2).
libpgm-5.3-0 set to manually installed.
libpocketsphinx3 is already the newest version (0.8.0+real5prealpha+1-14ubuntu1).
libpocketsphinx3 set to manually installed.
libportaudio2 is already the newest version (19.6.0-1.1).
libportaudiocpp0 is already the newest version (19.6.0-1.1).
librubberband2 is already the newest version (2.0.0-2).
librubberband2 set to manually installed.
libserd-0-0 is already the newest version (0.30.10-2).
libserd-0-0 set to manually installed.
libshine3 is already the newest version (3.1.1-2).
libshine3 set to manually installed.
libsndio7.0 is already the newest version (1.8.1-1.1).
libsndio7.0 set to manually installed.
libsord-0-0 is already the newest version (0.16.8-2).
libsord-0-0 set to manually installed.
libsphinxbase3 is already the newest version (0.8+5prealpha+1-13build1).
libsphinxbase3 set to manually installed.
libsratom-0-0 is already the newest version (0.6.8-1).
libsratom-0-0 set to manually installed.
libsrt1.4-gnutls is already the newest version (1.4.4-4).
libsrt1.4-gnutls set to manually installed.
libudfread0 is already the newest version (1.1.2-1).
libudfread0 set to manually installed.
libva-drm2 is already the newest version (2.14.0-1).
libva-drm2 set to manually installed.
libva-x11-2 is already the newest version (2.14.0-1).
libva-x11-2 set to manually installed.
libva2 is already the newest version (2.14.0-1).
libva2 set to manually installed.
libvidstab1.1 is already the newest version (1.1.0-2).
libvidstab1.1 set to manually installed.
libx264-163 is already the newest version (2:0.163.3060+git5db6aa6-2build1).
libx264-163 set to manually installed.
libx265-199 is already the newest version (3.5-2).
libx265-199 set to manually installed.
libxvidcore4 is already the newest version (2:1.3.7-1).
libxvidcore4 set to manually installed.
libzimg2 is already the newest version (3.0.3+ds1-1).
libzimg2 set to manually installed.
libzmq5 is already the newest version (4.3.4-2).
libzmq5 set to manually installed.
libzvbi-common is already the newest version (0.2.35-19).
libzvbi-common set to manually installed.
libzvbi0 is already the newest version (0.2.35-19).
libzvbi0 set to manually installed.
mailutils is already the newest version (1:3.14-1).
mailutils-common is already the newest version (1:3.14-1).
mailutils-common set to manually installed.
netpbm is already the newest version (2:10.0-15.4).
netpbm set to manually installed.
ocl-icd-libopencl1 is already the newest version (2.2.14-3).
ocl-icd-libopencl1 set to manually installed.
pigz is already the newest version (2.6-1).
pigz set to manually installed.
pocketsphinx-en-us is already the newest version (0.8.0+real5prealpha+1-14ubuntu1).
pocketsphinx-en-us set to manually installed.
podman is already the newest version (3.4.4+ds1-1ubuntu1).
podman set to manually installed.
portaudio19-dev is already the newest version (19.6.0-1.1).
python3-docker is already the newest version (5.0.3-1).
python3-docker set to manually installed.
python3-dockerpty is already the newest version (0.4.1-2).
python3-dockerpty set to manually installed.
python3-docopt is already the newest version (0.6.2-4).
python3-docopt set to manually installed.
python3-dotenv is already the newest version (0.19.2-1).
python3-dotenv set to manually installed.
python3-ipython-genutils is already the newest version (0.2.0-5).
python3-ipython-genutils set to manually installed.
python3-jupyter-core is already the newest version (4.9.1-1).
python3-jupyter-core set to manually installed.
python3-texttable is already the newest version (1.6.4-1).
python3-texttable set to manually installed.
python3-traitlets is already the newest version (5.1.1-1).
python3-traitlets set to manually installed.
python3-websocket is already the newest version (1.2.3-1).
python3-websocket set to manually installed.
slirp4netns is already the newest version (1.0.1-2).
slirp4netns set to manually installed.
ubuntu-fan is already the newest version (0.12.16).
ubuntu-fan set to manually installed.
va-driver-all is already the newest version (2.14.0-1).
va-driver-all set to manually installed.
alsa-ucm-conf is already the newest version (1.2.6.3-1ubuntu1.5).
alsa-ucm-conf set to manually installed.
apparmor is already the newest version (3.0.4-2ubuntu2.2).
apparmor set to manually installed.
apport is already the newest version (2.20.11-0ubuntu82.4).
apport set to manually installed.
base-files is already the newest version (12ubuntu4.3).
bind9-dnsutils is already the newest version (1:9.18.12-0ubuntu0.22.04.1).
bind9-dnsutils set to manually installed.
bind9-host is already the newest version (1:9.18.12-0ubuntu0.22.04.1).
bind9-host set to manually installed.
bind9-libs is already the newest version (1:9.18.12-0ubuntu0.22.04.1).
bind9-libs set to manually installed.
binutils is already the newest version (2.38-4ubuntu2.1).
binutils set to manually installed.
binutils-common is already the newest version (2.38-4ubuntu2.1).
binutils-common set to manually installed.
binutils-x86-64-linux-gnu is already the newest version (2.38-4ubuntu2.1).
binutils-x86-64-linux-gnu set to manually installed.
ca-certificates is already the newest version (20211016ubuntu0.22.04.1).
containerd is already the newest version (1.6.12-0ubuntu1~22.04.1).
containerd set to manually installed.
cpp-11 is already the newest version (11.3.0-1ubuntu1~22.04).
cpp-11 set to manually installed.
curl is already the newest version (7.81.0-1ubuntu1.10).
dbus is already the newest version (1.12.20-2ubuntu4.1).
dbus set to manually installed.
dbus-user-session is already the newest version (1.12.20-2ubuntu4.1).
dbus-user-session set to manually installed.
dbus-x11 is already the newest version (1.12.20-2ubuntu4.1).
dbus-x11 set to manually installed.
dirmngr is already the newest version (2.2.27-3ubuntu2.1).
dirmngr set to manually installed.
dmidecode is already the newest version (3.3-3ubuntu0.1).
dmidecode set to manually installed.
dpkg is already the newest version (1.21.1ubuntu2.1).
dpkg set to manually installed.
dpkg-dev is already the newest version (1.21.1ubuntu2.1).
dpkg-dev set to manually installed.
e2fsprogs is already the newest version (1.46.5-2ubuntu1.1).
e2fsprogs set to manually installed.
g++-11 is already the newest version (11.3.0-1ubuntu1~22.04).
g++-11 set to manually installed.
gcc-11 is already the newest version (11.3.0-1ubuntu1~22.04).
gcc-11 set to manually installed.
gcc-11-base is already the newest version (11.3.0-1ubuntu1~22.04).
gcc-11-base set to manually installed.
gcc-11-multilib is already the newest version (11.3.0-1ubuntu1~22.04).
gcc-11-multilib set to manually installed.
gcc-12-base is already the newest version (12.1.0-2ubuntu1~22.04).
gcc-12-base set to manually installed.
ghostscript is already the newest version (9.55.0~dfsg1-0ubuntu5.2).
ghostscript set to manually installed.
gir1.2-gdkpixbuf-2.0 is already the newest version (2.42.8+dfsg-1ubuntu0.2).
gir1.2-gdkpixbuf-2.0 set to manually installed.
gir1.2-gstreamer-1.0 is already the newest version (1.20.3-0ubuntu1).
gir1.2-gstreamer-1.0 set to manually installed.
gir1.2-gtk-3.0 is already the newest version (3.24.33-1ubuntu2).
gir1.2-harfbuzz-0.0 is already the newest version (2.7.4-1ubuntu3.1).
gir1.2-harfbuzz-0.0 set to manually installed.
gir1.2-pango-1.0 is already the newest version (1.50.6+ds-2ubuntu1).
gir1.2-pango-1.0 set to manually installed.
gnome-desktop3-data is already the newest version (42.5-0ubuntu1).
gnome-desktop3-data set to manually installed.
gnome-keyring is already the newest version (40.0-3ubuntu3).
gnome-keyring set to manually installed.
gnome-keyring-pkcs11 is already the newest version (40.0-3ubuntu3).
gnome-keyring-pkcs11 set to manually installed.
gnupg is already the newest version (2.2.27-3ubuntu2.1).
gnupg-l10n is already the newest version (2.2.27-3ubuntu2.1).
gnupg-l10n set to manually installed.
gnupg-utils is already the newest version (2.2.27-3ubuntu2.1).
gnupg-utils set to manually installed.
gpg is already the newest version (2.2.27-3ubuntu2.1).
gpg set to manually installed.
gpg-agent is already the newest version (2.2.27-3ubuntu2.1).
gpg-agent set to manually installed.
gpg-wks-client is already the newest version (2.2.27-3ubuntu2.1).
gpg-wks-client set to manually installed.
gpg-wks-server is already the newest version (2.2.27-3ubuntu2.1).
gpg-wks-server set to manually installed.
gpgconf is already the newest version (2.2.27-3ubuntu2.1).
gpgconf set to manually installed.
gpgsm is already the newest version (2.2.27-3ubuntu2.1).
gpgsm set to manually installed.
gpgv is already the newest version (2.2.27-3ubuntu2.1).
gpgv set to manually installed.
gstreamer1.0-plugins-good is already the newest version (1.20.3-0ubuntu1).
gtk-update-icon-cache is already the newest version (3.24.33-1ubuntu2).
gtk-update-icon-cache set to manually installed.
gvfs is already the newest version (1.48.2-0ubuntu1).
gvfs set to manually installed.
gvfs-backends is already the newest version (1.48.2-0ubuntu1).
gvfs-backends set to manually installed.
gvfs-common is already the newest version (1.48.2-0ubuntu1).
gvfs-common set to manually installed.
gvfs-daemons is already the newest version (1.48.2-0ubuntu1).
gvfs-daemons set to manually installed.
gvfs-libs is already the newest version (1.48.2-0ubuntu1).
gvfs-libs set to manually installed.
gzip is already the newest version (1.10-4ubuntu4.1).
isc-dhcp-client is already the newest version (4.4.1-2.3ubuntu2.4).
isc-dhcp-client set to manually installed.
isc-dhcp-common is already the newest version (4.4.1-2.3ubuntu2.4).
isc-dhcp-common set to manually installed.
kbd is already the newest version (2.3.0-3ubuntu4.22.04).
kbd set to manually installed.
less is already the newest version (590-1ubuntu0.22.04.1).
less set to manually installed.
lib32asan6 is already the newest version (11.3.0-1ubuntu1~22.04).
lib32asan6 set to manually installed.
lib32atomic1 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32atomic1 set to manually installed.
lib32gcc-11-dev is already the newest version (11.3.0-1ubuntu1~22.04).
lib32gcc-11-dev set to manually installed.
lib32gcc-s1 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32gcc-s1 set to manually installed.
lib32gomp1 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32gomp1 set to manually installed.
lib32itm1 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32itm1 set to manually installed.
lib32quadmath0 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32quadmath0 set to manually installed.
lib32stdc++6 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32stdc++6 set to manually installed.
lib32ubsan1 is already the newest version (12.1.0-2ubuntu1~22.04).
lib32ubsan1 set to manually installed.
libapparmor1 is already the newest version (3.0.4-2ubuntu2.2).
libapparmor1 set to manually installed.
libasan6 is already the newest version (11.3.0-1ubuntu1~22.04).
libasan6 set to manually installed.
libatomic1 is already the newest version (12.1.0-2ubuntu1~22.04).
libatomic1 set to manually installed.
libbinutils is already the newest version (2.38-4ubuntu2.1).
libbinutils set to manually installed.
libbpf0 is already the newest version (1:0.5.0-1ubuntu22.04.1).
libbpf0 set to manually installed.
libc-bin is already the newest version (2.35-0ubuntu3.1).
libc-bin set to manually installed.
libc-dev-bin is already the newest version (2.35-0ubuntu3.1).
libc-dev-bin set to manually installed.
libc-devtools is already the newest version (2.35-0ubuntu3.1).
libc-devtools set to manually installed.
libc6 is already the newest version (2.35-0ubuntu3.1).
libc6 set to manually installed.
libc6-dev is already the newest version (2.35-0ubuntu3.1).
libc6-dev set to manually installed.
libc6-dev-i386 is already the newest version (2.35-0ubuntu3.1).
libc6-dev-x32 is already the newest version (2.35-0ubuntu3.1).
libc6-dev-x32 set to manually installed.
libc6-i386 is already the newest version (2.35-0ubuntu3.1).
libc6-i386 set to manually installed.
libc6-x32 is already the newest version (2.35-0ubuntu3.1).
libc6-x32 set to manually installed.
libcc1-0 is already the newest version (12.1.0-2ubuntu1~22.04).
libcc1-0 set to manually installed.
libcom-err2 is already the newest version (1.46.5-2ubuntu1.1).
libcom-err2 set to manually installed.
libcryptsetup12 is already the newest version (2:2.4.3-1ubuntu1.1).
libcryptsetup12 set to manually installed.
libctf-nobfd0 is already the newest version (2.38-4ubuntu2.1).
libctf-nobfd0 set to manually installed.
libctf0 is already the newest version (2.38-4ubuntu2.1).
libctf0 set to manually installed.
libcups2 is already the newest version (2.4.1op1-1ubuntu4.1).
libcups2 set to manually installed.
libcurl3-gnutls is already the newest version (7.81.0-1ubuntu1.10).
libcurl3-gnutls set to manually installed.
libcurl4 is already the newest version (7.81.0-1ubuntu1.10).
libcurl4 set to manually installed.
libdbus-1-3 is already the newest version (1.12.20-2ubuntu4.1).
libdbus-1-3 set to manually installed.
libdpkg-perl is already the newest version (1.21.1ubuntu2.1).
libdpkg-perl set to manually installed.
libdrm-amdgpu1 is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm-amdgpu1 set to manually installed.
libdrm-common is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm-common set to manually installed.
libdrm-dev is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm-dev set to manually installed.
libdrm-intel1 is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm-intel1 set to manually installed.
libdrm-nouveau2 is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm-nouveau2 set to manually installed.
libdrm-radeon1 is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm-radeon1 set to manually installed.
libdrm2 is already the newest version (2.4.113-2~ubuntu0.22.04.1).
libdrm2 set to manually installed.
libegl-mesa0 is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
libegl-mesa0 set to manually installed.
libexempi8 is already the newest version (2.5.2-1ubuntu0.22.04.1).
libexempi8 set to manually installed.
libexpat1 is already the newest version (2.4.7-1ubuntu0.2).
libexpat1 set to manually installed.
libexpat1-dev is already the newest version (2.4.7-1ubuntu0.2).
libexpat1-dev set to manually installed.
libext2fs2 is already the newest version (1.46.5-2ubuntu1.1).
libext2fs2 set to manually installed.
libflac8 is already the newest version (1.3.3-2ubuntu0.1).
libflac8 set to manually installed.
libfreetype-dev is already the newest version (2.11.1+dfsg-1ubuntu0.1).
libfreetype-dev set to manually installed.
libfreetype6 is already the newest version (2.11.1+dfsg-1ubuntu0.1).
libfreetype6 set to manually installed.
libfreetype6-dev is already the newest version (2.11.1+dfsg-1ubuntu0.1).
libfreetype6-dev set to manually installed.
libfribidi0 is already the newest version (1.0.8-2ubuntu3.1).
libfribidi0 set to manually installed.
libgbm-dev is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
libgbm-dev set to manually installed.
libgbm1 is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
libgbm1 set to manually installed.
libgcc-11-dev is already the newest version (11.3.0-1ubuntu1~22.04).
libgcc-11-dev set to manually installed.
libgcc-s1 is already the newest version (12.1.0-2ubuntu1~22.04).
libgcc-s1 set to manually installed.
libgdk-pixbuf-2.0-0 is already the newest version (2.42.8+dfsg-1ubuntu0.2).
libgdk-pixbuf-2.0-0 set to manually installed.
libgdk-pixbuf2.0-bin is already the newest version (2.42.8+dfsg-1ubuntu0.2).
libgdk-pixbuf2.0-bin set to manually installed.
libgdk-pixbuf2.0-common is already the newest version (2.42.8+dfsg-1ubuntu0.2).
libgdk-pixbuf2.0-common set to manually installed.
libgfortran5 is already the newest version (12.1.0-2ubuntu1~22.04).
libgfortran5 set to manually installed.
libgl1-mesa-dri is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
libgl1-mesa-dri set to manually installed.
libglapi-mesa is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
libglapi-mesa set to manually installed.
libglx-mesa0 is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
libglx-mesa0 set to manually installed.
libgnome-desktop-3-19 is already the newest version (42.5-0ubuntu1).
libgnome-desktop-3-19 set to manually installed.
libgnutls30 is already the newest version (3.7.3-4ubuntu1.2).
libgnutls30 set to manually installed.
libgomp1 is already the newest version (12.1.0-2ubuntu1~22.04).
libgomp1 set to manually installed.
libgs9 is already the newest version (9.55.0~dfsg1-0ubuntu5.2).
libgs9 set to manually installed.
libgs9-common is already the newest version (9.55.0~dfsg1-0ubuntu5.2).
libgs9-common set to manually installed.
libgssapi-krb5-2 is already the newest version (1.19.2-2ubuntu0.1).
libgssapi-krb5-2 set to manually installed.
libgstreamer-plugins-good1.0-0 is already the newest version (1.20.3-0ubuntu1).
libgstreamer-plugins-good1.0-0 set to manually installed.
libgstreamer1.0-0 is already the newest version (1.20.3-0ubuntu1).
libgstreamer1.0-0 set to manually installed.
libgstreamer1.0-dev is already the newest version (1.20.3-0ubuntu1).
libgtk-3-0 is already the newest version (3.24.33-1ubuntu2).
libgtk-3-0 set to manually installed.
libgtk-3-bin is already the newest version (3.24.33-1ubuntu2).
libgtk-3-bin set to manually installed.
libgtk-3-common is already the newest version (3.24.33-1ubuntu2).
libgtk-3-common set to manually installed.
libharfbuzz0b is already the newest version (2.7.4-1ubuntu3.1).
libharfbuzz0b set to manually installed.
libitm1 is already the newest version (12.1.0-2ubuntu1~22.04).
libitm1 set to manually installed.
libjbig0 is already the newest version (2.1-3.1ubuntu0.22.04.1).
libjbig0 set to manually installed.
libjson-c5 is already the newest version (0.15-3~ubuntu1.22.04.1).
libjson-c5 set to manually installed.
libk5crypto3 is already the newest version (1.19.2-2ubuntu0.1).
libk5crypto3 set to manually installed.
libkrb5-3 is already the newest version (1.19.2-2ubuntu0.1).
libkrb5-3 set to manually installed.
libkrb5support0 is already the newest version (1.19.2-2ubuntu0.1).
libkrb5support0 set to manually installed.
libksba8 is already the newest version (1.6.0-2ubuntu0.2).
libksba8 set to manually installed.
libldap-2.5-0 is already the newest version (2.5.14+dfsg-0ubuntu0.22.04.2).
libldap-2.5-0 set to manually installed.
libldap-common is already the newest version (2.5.14+dfsg-0ubuntu0.22.04.2).
libldap-common set to manually installed.
libldb2 is already the newest version (2:2.4.4-0ubuntu0.22.04.2).
libldb2 set to manually installed.
libllvm15 is already the newest version (1:15.0.7-0ubuntu0.22.04.1).
libllvm15 set to manually installed.
liblsan0 is already the newest version (12.1.0-2ubuntu1~22.04).
liblsan0 set to manually installed.
libmysqlclient21 is already the newest version (8.0.32-0ubuntu0.22.04.2).
libmysqlclient21 set to manually installed.
libnautilus-extension1a is already the newest version (1:42.2-0ubuntu2.1).
libnautilus-extension1a set to manually installed.
libnetplan0 is already the newest version (0.105-0ubuntu2~22.04.3).
libnetplan0 set to manually installed.
libnftables1 is already the newest version (1.0.2-1ubuntu3).
libnftables1 set to manually installed.
libnm0 is already the newest version (1.36.6-0ubuntu2).
libnm0 set to manually installed.
libnss-systemd is already the newest version (249.11-0ubuntu3.9).
libnss-systemd set to manually installed.
libnss3 is already the newest version (2:3.68.2-0ubuntu1.2).
libnss3 set to manually installed.
libntfs-3g89 is already the newest version (1:2021.8.22-3ubuntu1.2).
libntfs-3g89 set to manually installed.
libpam-gnome-keyring is already the newest version (40.0-3ubuntu3).
libpam-gnome-keyring set to manually installed.
libpam-modules is already the newest version (1.4.0-11ubuntu2.3).
libpam-modules set to manually installed.
libpam-modules-bin is already the newest version (1.4.0-11ubuntu2.3).
libpam-modules-bin set to manually installed.
libpam-runtime is already the newest version (1.4.0-11ubuntu2.3).
libpam-runtime set to manually installed.
libpam-systemd is already the newest version (249.11-0ubuntu3.9).
libpam-systemd set to manually installed.
libpam0g is already the newest version (1.4.0-11ubuntu2.3).
libpam0g set to manually installed.
libpango-1.0-0 is already the newest version (1.50.6+ds-2ubuntu1).
libpango-1.0-0 set to manually installed.
libpangocairo-1.0-0 is already the newest version (1.50.6+ds-2ubuntu1).
libpangocairo-1.0-0 set to manually installed.
libpangoft2-1.0-0 is already the newest version (1.50.6+ds-2ubuntu1).
libpangoft2-1.0-0 set to manually installed.
libpangoxft-1.0-0 is already the newest version (1.50.6+ds-2ubuntu1).
libpangoxft-1.0-0 set to manually installed.
libpcre16-3 is already the newest version (2:8.39-13ubuntu0.22.04.1).
libpcre16-3 set to manually installed.
libpcre2-16-0 is already the newest version (10.39-3ubuntu0.1).
libpcre2-16-0 set to manually installed.
libpcre2-32-0 is already the newest version (10.39-3ubuntu0.1).
libpcre2-32-0 set to manually installed.
libpcre2-8-0 is already the newest version (10.39-3ubuntu0.1).
libpcre2-8-0 set to manually installed.
libpcre2-dev is already the newest version (10.39-3ubuntu0.1).
libpcre2-dev set to manually installed.
libpcre2-posix3 is already the newest version (10.39-3ubuntu0.1).
libpcre2-posix3 set to manually installed.
libpcre3 is already the newest version (2:8.39-13ubuntu0.22.04.1).
libpcre3 set to manually installed.
libpcre3-dev is already the newest version (2:8.39-13ubuntu0.22.04.1).
libpcre3-dev set to manually installed.
libpcre32-3 is already the newest version (2:8.39-13ubuntu0.22.04.1).
libpcre32-3 set to manually installed.
libpcrecpp0v5 is already the newest version (2:8.39-13ubuntu0.22.04.1).
libpcrecpp0v5 set to manually installed.
libperl5.34 is already the newest version (5.34.0-3ubuntu1.1).
libperl5.34 set to manually installed.
libpixman-1-0 is already the newest version (0.40.0-1ubuntu0.22.04.1).
libpixman-1-0 set to manually installed.
libpixman-1-dev is already the newest version (0.40.0-1ubuntu0.22.04.1).
libpixman-1-dev set to manually installed.
libpoppler-glib8 is already the newest version (22.02.0-2ubuntu0.1).
libpoppler-glib8 set to manually installed.
libpoppler118 is already the newest version (22.02.0-2ubuntu0.1).
libpoppler118 set to manually installed.
libpq5 is already the newest version (14.7-0ubuntu0.22.04.1).
libpq5 set to manually installed.
libpulse0 is already the newest version (1:15.99.1+dfsg1-1ubuntu2.1).
libpulse0 set to manually installed.
libpython3-dev is already the newest version (3.10.6-1~22.04).
libpython3-dev set to manually installed.
libpython3-stdlib is already the newest version (3.10.6-1~22.04).
libpython3-stdlib set to manually installed.
libpython3.10 is already the newest version (3.10.6-1~22.04.2ubuntu1).
libpython3.10 set to manually installed.
libpython3.10-dev is already the newest version (3.10.6-1~22.04.2ubuntu1).
libpython3.10-dev set to manually installed.
libpython3.10-minimal is already the newest version (3.10.6-1~22.04.2ubuntu1).
libpython3.10-minimal set to manually installed.
libpython3.10-stdlib is already the newest version (3.10.6-1~22.04.2ubuntu1).
libpython3.10-stdlib set to manually installed.
libquadmath0 is already the newest version (12.1.0-2ubuntu1~22.04).
libquadmath0 set to manually installed.
libsasl2-2 is already the newest version (2.1.27+dfsg2-3ubuntu1.2).
libsasl2-2 set to manually installed.
libsasl2-modules is already the newest version (2.1.27+dfsg2-3ubuntu1.2).
libsasl2-modules set to manually installed.
libsasl2-modules-db is already the newest version (2.1.27+dfsg2-3ubuntu1.2).
libsasl2-modules-db set to manually installed.
libsdl2-2.0-0 is already the newest version (2.0.20+dfsg-2ubuntu1.22.04.1).
libsdl2-2.0-0 set to manually installed.
libsmbclient is already the newest version (2:4.15.13+dfsg-0ubuntu1.1).
libsmbclient set to manually installed.
libsqlite3-0 is already the newest version (3.37.2-2ubuntu0.1).
libsqlite3-0 set to manually installed.
libss2 is already the newest version (1.46.5-2ubuntu1.1).
libss2 set to manually installed.
libstdc++-11-dev is already the newest version (11.3.0-1ubuntu1~22.04).
libstdc++-11-dev set to manually installed.
libstdc++6 is already the newest version (12.1.0-2ubuntu1~22.04).
libstdc++6 set to manually installed.
libsystemd0 is already the newest version (249.11-0ubuntu3.9).
libsystemd0 set to manually installed.
libtiff5 is already the newest version (4.3.0-6ubuntu0.4).
libtiff5 set to manually installed.
libtirpc-common is already the newest version (1.3.2-2ubuntu0.1).
libtirpc-common set to manually installed.
libtirpc-dev is already the newest version (1.3.2-2ubuntu0.1).
libtirpc-dev set to manually installed.
libtirpc3 is already the newest version (1.3.2-2ubuntu0.1).
libtirpc3 set to manually installed.
libtsan0 is already the newest version (11.3.0-1ubuntu1~22.04).
libtsan0 set to manually installed.
libubsan1 is already the newest version (12.1.0-2ubuntu1~22.04).
libubsan1 set to manually installed.
libudev-dev is already the newest version (249.11-0ubuntu3.9).
libudev-dev set to manually installed.
libudev1 is already the newest version (249.11-0ubuntu3.9).
libudev1 set to manually installed.
libusb-1.0-0 is already the newest version (2:1.0.25-1ubuntu2).
libusb-1.0-0 set to manually installed.
libwayland-bin is already the newest version (1.20.0-1ubuntu0.1).
libwayland-bin set to manually installed.
libwayland-client0 is already the newest version (1.20.0-1ubuntu0.1).
libwayland-client0 set to manually installed.
libwayland-cursor0 is already the newest version (1.20.0-1ubuntu0.1).
libwayland-cursor0 set to manually installed.
libwayland-dev is already the newest version (1.20.0-1ubuntu0.1).
libwayland-dev set to manually installed.
libwayland-egl1 is already the newest version (1.20.0-1ubuntu0.1).
libwayland-egl1 set to manually installed.
libwayland-server0 is already the newest version (1.20.0-1ubuntu0.1).
libwayland-server0 set to manually installed.
libwbclient0 is already the newest version (2:4.15.13+dfsg-0ubuntu1.1).
libwbclient0 set to manually installed.
libx32asan6 is already the newest version (11.3.0-1ubuntu1~22.04).
libx32asan6 set to manually installed.
libx32atomic1 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32atomic1 set to manually installed.
libx32gcc-11-dev is already the newest version (11.3.0-1ubuntu1~22.04).
libx32gcc-11-dev set to manually installed.
libx32gcc-s1 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32gcc-s1 set to manually installed.
libx32gomp1 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32gomp1 set to manually installed.
libx32itm1 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32itm1 set to manually installed.
libx32quadmath0 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32quadmath0 set to manually installed.
libx32stdc++6 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32stdc++6 set to manually installed.
libx32ubsan1 is already the newest version (12.1.0-2ubuntu1~22.04).
libx32ubsan1 set to manually installed.
libxpm4 is already the newest version (1:3.5.12-1ubuntu0.22.04.1).
libxpm4 set to manually installed.
locales is already the newest version (2.35-0ubuntu3.1).
locales set to manually installed.
login is already the newest version (1:4.8.1-2ubuntu2.1).
logrotate is already the newest version (3.19.0-1ubuntu1.1).
logrotate set to manually installed.
logsave is already the newest version (1.46.5-2ubuntu1.1).
logsave set to manually installed.
mesa-vdpau-drivers is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
mesa-vdpau-drivers set to manually installed.
motd-news-config is already the newest version (12ubuntu4.3).
motd-news-config set to manually installed.
nautilus is already the newest version (1:42.2-0ubuntu2.1).
nautilus-data is already the newest version (1:42.2-0ubuntu2.1).
nautilus-data set to manually installed.
netplan.io is already the newest version (0.105-0ubuntu2~22.04.3).
netplan.io set to manually installed.
networkd-dispatcher is already the newest version (2.1-2ubuntu0.22.04.2).
networkd-dispatcher set to manually installed.
nftables is already the newest version (1.0.2-1ubuntu3).
nftables set to manually installed.
ntfs-3g is already the newest version (1:2021.8.22-3ubuntu1.2).
ntfs-3g set to manually installed.
openssh-client is already the newest version (1:8.9p1-3ubuntu0.1).
openssh-client set to manually installed.
passwd is already the newest version (1:4.8.1-2ubuntu2.1).
passwd set to manually installed.
perl is already the newest version (5.34.0-3ubuntu1.1).
perl set to manually installed.
perl-base is already the newest version (5.34.0-3ubuntu1.1).
perl-base set to manually installed.
perl-modules-5.34 is already the newest version (5.34.0-3ubuntu1.1).
perl-modules-5.34 set to manually installed.
postfix is already the newest version (3.6.4-1ubuntu1.1).
postfix set to manually installed.
python-apt-common is already the newest version (2.4.0ubuntu1).
python-apt-common set to manually installed.
python3 is already the newest version (3.10.6-1~22.04).
python3-apport is already the newest version (2.20.11-0ubuntu82.4).
python3-apport set to manually installed.
python3-apt is already the newest version (2.4.0ubuntu1).
python3-apt set to manually installed.
python3-dev is already the newest version (3.10.6-1~22.04).
python3-dev set to manually installed.
python3-distupgrade is already the newest version (1:22.04.16).
python3-distupgrade set to manually installed.
python3-distutils is already the newest version (3.10.6-1~22.04).
python3-distutils set to manually installed.
python3-gdbm is already the newest version (3.10.6-1~22.04).
python3-gdbm set to manually installed.
python3-gi is already the newest version (3.42.1-0ubuntu1).
python3-jwt is already the newest version (2.3.0-1ubuntu0.2).
python3-jwt set to manually installed.
python3-ldb is already the newest version (2:2.4.4-0ubuntu0.22.04.2).
python3-ldb set to manually installed.
python3-lib2to3 is already the newest version (3.10.6-1~22.04).
python3-lib2to3 set to manually installed.
python3-mako is already the newest version (1.1.3+ds1-2ubuntu0.1).
python3-mako set to manually installed.
python3-minimal is already the newest version (3.10.6-1~22.04).
python3-minimal set to manually installed.
python3-oauthlib is already the newest version (3.2.0-1ubuntu0.1).
python3-oauthlib set to manually installed.
python3-pkg-resources is already the newest version (59.6.0-1.2ubuntu0.22.04.1).
python3-pkg-resources set to manually installed.
python3-problem-report is already the newest version (2.20.11-0ubuntu82.4).
python3-problem-report set to manually installed.
python3-setuptools is already the newest version (59.6.0-1.2ubuntu0.22.04.1).
python3-setuptools set to manually installed.
python3-software-properties is already the newest version (0.99.22.6).
python3-software-properties set to manually installed.
python3-update-manager is already the newest version (1:22.04.10).
python3-update-manager set to manually installed.
python3.10 is already the newest version (3.10.6-1~22.04.2ubuntu1).
python3.10 set to manually installed.
python3.10-dev is already the newest version (3.10.6-1~22.04.2ubuntu1).
python3.10-dev set to manually installed.
python3.10-minimal is already the newest version (3.10.6-1~22.04.2ubuntu1).
python3.10-minimal set to manually installed.
rsync is already the newest version (3.2.7-0ubuntu0.22.04.2).
rsync set to manually installed.
rsyslog is already the newest version (8.2112.0-2ubuntu2.2).
rsyslog set to manually installed.
runc is already the newest version (1.1.4-0ubuntu1~22.04.1).
runc set to manually installed.
samba-libs is already the newest version (2:4.15.13+dfsg-0ubuntu1.1).
samba-libs set to manually installed.
snapd is already the newest version (2.58+22.04).
snapd set to manually installed.
software-properties-common is already the newest version (0.99.22.6).
sudo is already the newest version (1.9.9-1ubuntu2.4).
sudo set to manually installed.
systemd is already the newest version (249.11-0ubuntu3.9).
systemd set to manually installed.
systemd-hwe-hwdb is already the newest version (249.11.3).
systemd-hwe-hwdb set to manually installed.
systemd-sysv is already the newest version (249.11-0ubuntu3.9).
systemd-sysv set to manually installed.
systemd-timesyncd is already the newest version (249.11-0ubuntu3.9).
systemd-timesyncd set to manually installed.
tar is already the newest version (1.34+dfsg-1ubuntu0.1.22.04.1).
tar set to manually installed.
tcpdump is already the newest version (4.99.1-3ubuntu0.1).
tcpdump set to manually installed.
tmux is already the newest version (3.2a-4ubuntu0.2).
tmux set to manually installed.
ubuntu-release-upgrader-core is already the newest version (1:22.04.16).
ubuntu-release-upgrader-core set to manually installed.
udev is already the newest version (249.11-0ubuntu3.9).
udev set to manually installed.
update-manager-core is already the newest version (1:22.04.10).
update-manager-core set to manually installed.
vim is already the newest version (2:8.2.3995-1ubuntu2.7).
vim-common is already the newest version (2:8.2.3995-1ubuntu2.7).
vim-common set to manually installed.
vim-runtime is already the newest version (2:8.2.3995-1ubuntu2.7).
vim-runtime set to manually installed.
vim-tiny is already the newest version (2:8.2.3995-1ubuntu2.7).
vim-tiny set to manually installed.
zlib1g is already the newest version (1:1.2.11.dfsg-2ubuntu9.2).
zlib1g set to manually installed.
zlib1g-dev is already the newest version (1:1.2.11.dfsg-2ubuntu9.2).
zlib1g-dev set to manually installed.
ffmpeg is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
graphicsmagick is already the newest version (1.4+really1.3.38-1ubuntu0.1).
graphicsmagick set to manually installed.
imagemagick-6-common is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
imagemagick-6-common set to manually installed.
imagemagick-6.q16 is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
imagemagick-6.q16hdri is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
intel-media-va-driver is already the newest version (22.3.1+dfsg1-1ubuntu1).
intel-media-va-driver set to manually installed.
libavcodec58 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libavcodec58 set to manually installed.
libavdevice58 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libavdevice58 set to manually installed.
libavfilter7 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libavfilter7 set to manually installed.
libavformat58 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libavformat58 set to manually installed.
libavutil56 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libavutil56 set to manually installed.
libgraphicsmagick-q16-3 is already the newest version (1.4+really1.3.38-1ubuntu0.1).
libgraphicsmagick-q16-3 set to manually installed.
libmagickcore-6.q16-6 is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
libmagickcore-6.q16-6 set to manually installed.
libmagickcore-6.q16-6-extra is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
libmagickcore-6.q16-6-extra set to manually installed.
libmagickcore-6.q16hdri-6 is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
libmagickcore-6.q16hdri-6 set to manually installed.
libmagickcore-6.q16hdri-6-extra is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
libmagickcore-6.q16hdri-6-extra set to manually installed.
libmagickwand-6.q16-6 is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
libmagickwand-6.q16-6 set to manually installed.
libmagickwand-6.q16hdri-6 is already the newest version (8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3).
libmagickwand-6.q16hdri-6 set to manually installed.
libpostproc55 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libpostproc55 set to manually installed.
libswresample3 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libswresample3 set to manually installed.
libswscale5 is already the newest version (7:4.4.2-0ubuntu0.22.04.1).
libswscale5 set to manually installed.
mesa-va-drivers is already the newest version (22.2.5-0ubuntu0.1~22.04.1).
mesa-va-drivers set to manually installed.
python3-pip is already the newest version (22.0.2+dfsg-1ubuntu0.2).
python3-pip-whl is already the newest version (22.0.2+dfsg-1ubuntu0.2).
python3-pip-whl set to manually installed.
python3-setuptools-whl is already the newest version (59.6.0-1.2ubuntu0.22.04.1).
python3-setuptools-whl set to manually installed.
python3-venv is already the newest version (3.10.6-1~22.04).
python3-wheel is already the newest version (0.37.1-2ubuntu0.22.04.1).
python3-wheel set to manually installed.
python3.10-venv is already the newest version (3.10.6-1~22.04.2ubuntu1).
python3.10-venv set to manually installed.
uidmap is already the newest version (1:4.8.1-2ubuntu2.1).
uidmap set to manually installed.
Suggested packages:
  apt-doc aptitude | synaptic | wajig aufs-tools btrfs-progs cgroupfs-mount | cgroup-lite debootstrap docker-doc rinse zfs-fuse | zfsutils git-daemon-run
  | git-daemon-sysvinit git-doc git-email git-gui gitk gitweb git-cvs git-mediawiki git-svn libglib2.0-doc libxml2-utils
The following packages will be upgraded:
  apt apt-utils distro-info-data dnsmasq-base docker.io git git-man libapt-pkg6.0 libglib2.0-0 libglib2.0-bin libglib2.0-data libglib2.0-dev libglib2.0-dev-bin libssl3
  libxml2 linux-libc-dev openssl tzdata ubuntu-advantage-tools xxd
20 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
1 not fully installed or removed.
Need to get 49.4 MB of archives.
After this operation, 396 kB of additional disk space will be used.
Do you want to continue? [Y/n] Y
Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libssl3 amd64 3.0.2-0ubuntu1.9 [1902 kB]
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libapt-pkg6.0 amd64 2.4.9 [906 kB]
Get:3 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 apt amd64 2.4.9 [1379 kB]
Get:4 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 apt-utils amd64 2.4.9 [211 kB]
Get:5 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 distro-info-data all 0.52ubuntu0.4 [4986 B]
Get:6 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libglib2.0-dev-bin amd64 2.72.4-0ubuntu2 [116 kB]
Get:7 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libglib2.0-dev amd64 2.72.4-0ubuntu2 [1738 kB]
Get:8 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libglib2.0-data all 2.72.4-0ubuntu2 [4968 B]
Get:9 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libglib2.0-bin amd64 2.72.4-0ubuntu2 [80.9 kB]
Get:10 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libglib2.0-0 amd64 2.72.4-0ubuntu2 [1462 kB]
Get:11 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libxml2 amd64 2.9.13+dfsg-1ubuntu0.3 [763 kB]
Get:12 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 openssl amd64 3.0.2-0ubuntu1.9 [1185 kB]
Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 tzdata all 2023c-0ubuntu0.22.04.1 [354 kB]
Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 ubuntu-advantage-tools amd64 27.14.4~22.04 [171 kB]
Get:15 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 xxd amd64 2:8.2.3995-1ubuntu2.7 [53.7 kB]
Get:16 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 dnsmasq-base amd64 2.86-1.1ubuntu0.3 [354 kB]
Get:17 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 docker.io amd64 20.10.21-0ubuntu1~22.04.3 [33.3 MB]
Get:18 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 git-man all 1:2.34.1-1ubuntu1.9 [954 kB]
Get:19 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 git amd64 1:2.34.1-1ubuntu1.9 [3166 kB]
Get:20 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 linux-libc-dev amd64 5.15.0-71.78 [1323 kB]
Fetched 49.4 MB in 5s (10.8 MB/s)
Preconfiguring packages ...
(Reading database ... 58618 files and directories currently installed.)
Preparing to unpack .../libssl3_3.0.2-0ubuntu1.9_amd64.deb ...
Unpacking libssl3:amd64 (3.0.2-0ubuntu1.9) over (3.0.2-0ubuntu1.8) ...
Setting up libssl3:amd64 (3.0.2-0ubuntu1.9) ...
(Reading database ... 58618 files and directories currently installed.)
Preparing to unpack .../libapt-pkg6.0_2.4.9_amd64.deb ...
Unpacking libapt-pkg6.0:amd64 (2.4.9) over (2.4.8) ...
Setting up libapt-pkg6.0:amd64 (2.4.9) ...
(Reading database ... 58618 files and directories currently installed.)
Preparing to unpack .../archives/apt_2.4.9_amd64.deb ...
Unpacking apt (2.4.9) over (2.4.8) ...
Setting up apt (2.4.9) ...
(Reading database ... 58618 files and directories currently installed.)
Preparing to unpack .../00-apt-utils_2.4.9_amd64.deb ...
Unpacking apt-utils (2.4.9) over (2.4.8) ...
Preparing to unpack .../01-distro-info-data_0.52ubuntu0.4_all.deb ...
Unpacking distro-info-data (0.52ubuntu0.4) over (0.52ubuntu0.3) ...
Preparing to unpack .../02-libglib2.0-dev-bin_2.72.4-0ubuntu2_amd64.deb ...
Unpacking libglib2.0-dev-bin (2.72.4-0ubuntu2) over (2.72.4-0ubuntu1) ...
Preparing to unpack .../03-libglib2.0-dev_2.72.4-0ubuntu2_amd64.deb ...
Unpacking libglib2.0-dev:amd64 (2.72.4-0ubuntu2) over (2.72.4-0ubuntu1) ...
Preparing to unpack .../04-libglib2.0-data_2.72.4-0ubuntu2_all.deb ...
Unpacking libglib2.0-data (2.72.4-0ubuntu2) over (2.72.4-0ubuntu1) ...
Preparing to unpack .../05-libglib2.0-bin_2.72.4-0ubuntu2_amd64.deb ...
Unpacking libglib2.0-bin (2.72.4-0ubuntu2) over (2.72.4-0ubuntu1) ...
Preparing to unpack .../06-libglib2.0-0_2.72.4-0ubuntu2_amd64.deb ...
Unpacking libglib2.0-0:amd64 (2.72.4-0ubuntu2) over (2.72.4-0ubuntu1) ...
Preparing to unpack .../07-libxml2_2.9.13+dfsg-1ubuntu0.3_amd64.deb ...
Unpacking libxml2:amd64 (2.9.13+dfsg-1ubuntu0.3) over (2.9.13+dfsg-1ubuntu0.2) ...
Preparing to unpack .../08-openssl_3.0.2-0ubuntu1.9_amd64.deb ...
Unpacking openssl (3.0.2-0ubuntu1.9) over (3.0.2-0ubuntu1.8) ...
Preparing to unpack .../09-tzdata_2023c-0ubuntu0.22.04.1_all.deb ...
Unpacking tzdata (2023c-0ubuntu0.22.04.1) over (2023c-0ubuntu0.22.04.0) ...
Preparing to unpack .../10-ubuntu-advantage-tools_27.14.4~22.04_amd64.deb ...
Unpacking ubuntu-advantage-tools (27.14.4~22.04) over (27.13.6~22.04.1) ...
Preparing to unpack .../11-xxd_2%3a8.2.3995-1ubuntu2.7_amd64.deb ...
Unpacking xxd (2:8.2.3995-1ubuntu2.7) over (2:8.2.3995-1ubuntu2.5) ...
Preparing to unpack .../12-dnsmasq-base_2.86-1.1ubuntu0.3_amd64.deb ...
Unpacking dnsmasq-base (2.86-1.1ubuntu0.3) over (2.86-1.1ubuntu0.2) ...
Preparing to unpack .../13-docker.io_20.10.21-0ubuntu1~22.04.3_amd64.deb ...
Unpacking docker.io (20.10.21-0ubuntu1~22.04.3) over (20.10.21-0ubuntu1~22.04.2) ...
Preparing to unpack .../14-git-man_1%3a2.34.1-1ubuntu1.9_all.deb ...
Unpacking git-man (1:2.34.1-1ubuntu1.9) over (1:2.34.1-1ubuntu1.8) ...
Preparing to unpack .../15-git_1%3a2.34.1-1ubuntu1.9_amd64.deb ...
Unpacking git (1:2.34.1-1ubuntu1.9) over (1:2.34.1-1ubuntu1.8) ...
Preparing to unpack .../16-linux-libc-dev_5.15.0-71.78_amd64.deb ...
Unpacking linux-libc-dev:amd64 (5.15.0-71.78) over (5.15.0-69.76) ...
Setting up apt-utils (2.4.9) ...
Setting up libglib2.0-0:amd64 (2.72.4-0ubuntu2) ...
Setting up distro-info-data (0.52ubuntu0.4) ...
Setting up linux-libc-dev:amd64 (5.15.0-71.78) ...
Setting up docker.io (20.10.21-0ubuntu1~22.04.3) ...
invoke-rc.d: unknown initscript, /etc/init.d/docker not found.
invoke-rc.d: could not determine current runlevel
Setting up dnsmasq-base (2.86-1.1ubuntu0.3) ...
Setting up xxd (2:8.2.3995-1ubuntu2.7) ...
Setting up tzdata (2023c-0ubuntu0.22.04.1) ...

Current default time zone: 'America/Los_Angeles'
Local time is now:      Tue May  9 15:33:26 PDT 2023.
Universal Time is now:  Tue May  9 22:33:26 UTC 2023.
Run 'dpkg-reconfigure tzdata' if you wish to change it.

Setting up libglib2.0-data (2.72.4-0ubuntu2) ...
Setting up postfix (3.6.4-1ubuntu1.1) ...

Postfix (main.cf) configuration was not changed.  If you need to make changes,
edit /etc/postfix/main.cf (and others) as needed.  To view Postfix
configuration values, see postconf(1).

After modifying main.cf, be sure to run 'systemctl reload postfix'.

Running newaliases
newaliases: fatal: bad string length 0 < 1: mydomain =
dpkg: error processing package postfix (--configure):
 installed postfix package post-installation script subprocess returned error exit status 75
Setting up git-man (1:2.34.1-1ubuntu1.9) ...
Setting up ubuntu-advantage-tools (27.14.4~22.04) ...
Installing new version of config file /etc/apt/apt.conf.d/20apt-esm-hook.conf ...
Installing new version of config file /etc/ubuntu-advantage/uaclient.conf ...
Installing new version of config file /etc/update-motd.d/91-contract-ua-esm-status ...
Removing obsolete conffile /etc/update-motd.d/88-esm-announce ...
Setting up openssl (3.0.2-0ubuntu1.9) ...
Setting up libxml2:amd64 (2.9.13+dfsg-1ubuntu0.3) ...
Setting up libglib2.0-dev-bin (2.72.4-0ubuntu2) ...
Setting up libglib2.0-bin (2.72.4-0ubuntu2) ...
Setting up libglib2.0-dev:amd64 (2.72.4-0ubuntu2) ...
Setting up git (1:2.34.1-1ubuntu1.9) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for dbus (1.12.20-2ubuntu4.1) ...
Processing triggers for libc-bin (2.35-0ubuntu3.1) ...
/sbin/ldconfig.real: /usr/lib/wsl/lib/libcuda.so.1 is not a symbolic link

Errors were encountered while processing:
 postfix
E: Sub-process /usr/bin/dpkg returned an error code (1)
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install--reinstall postfix
E: Invalid operation install--reinstall
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install --reinstall postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
0 upgraded, 0 newly installed, 1 reinstalled, 0 to remove and 0 not upgraded.
1 not fully installed or removed.
After this operation, 0 B of additional disk space will be used.
E: Internal Error, No file name for postfix:amd64
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get remove postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  postfix
0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
1 not fully installed or removed.
After this operation, 4180 kB disk space will be freed.
Do you want to continue? [Y/n] Y
(Reading database ... 58630 files and directories currently installed.)
Removing postfix (3.6.4-1ubuntu1.1) ...
invoke-rc.d: could not determine current runlevel
postmulti: fatal: bad string length 0 < 1: mydomain =
   ...done.
Processing triggers for man-db (2.10.2-1) ...
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  procmail postfix-mysql postfix-pgsql postfix-ldap postfix-pcre postfix-lmdb postfix-sqlite sasl2-bin | dovecot-common resolvconf postfix-cdb postfix-mta-sts-resolver
  postfix-doc
The following NEW packages will be installed:
  postfix
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 0 B/1245 kB of archives.
After this operation, 4180 kB of additional disk space will be used.
Preconfiguring packages ...
Selecting previously unselected package postfix.
(Reading database ... 58450 files and directories currently installed.)
Preparing to unpack .../postfix_3.6.4-1ubuntu1.1_amd64.deb ...
Unpacking postfix (3.6.4-1ubuntu1.1) ...
Setting up postfix (3.6.4-1ubuntu1.1) ...

Postfix (main.cf) configuration was not changed.  If you need to make changes,
edit /etc/postfix/main.cf (and others) as needed.  To view Postfix
configuration values, see postconf(1).

After modifying main.cf, be sure to run 'systemctl reload postfix'.

Running newaliases
newaliases: fatal: bad string length 0 < 1: mydomain =
dpkg: error processing package postfix (--configure):
 installed postfix package post-installation script subprocess returned error exit status 75
Processing triggers for ufw (0.36.1-4build1) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for rsyslog (8.2112.0-2ubuntu2.2) ...
invoke-rc.d: unknown initscript, /etc/init.d/rsyslog not found.
invoke-rc.d: could not determine current runlevel
Errors were encountered while processing:
 postfix
E: Sub-process /usr/bin/dpkg returned an error code (1)
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get purge postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  postfix*
0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
1 not fully installed or removed.
After this operation, 4180 kB disk space will be freed.
Do you want to continue? [Y/n] Y
(Reading database ... 58630 files and directories currently installed.)
Removing postfix (3.6.4-1ubuntu1.1) ...
invoke-rc.d: could not determine current runlevel
postmulti: fatal: bad string length 0 < 1: mydomain =
   ...done.
Processing triggers for man-db (2.10.2-1) ...
(Reading database ... 58450 files and directories currently installed.)
Purging configuration files for postfix (3.6.4-1ubuntu1.1) ...
Processing triggers for ufw (0.36.1-4build1) ...
Processing triggers for rsyslog (8.2112.0-2ubuntu2.2) ...
invoke-rc.d: unknown initscript, /etc/init.d/rsyslog not found.
invoke-rc.d: could not determine current runlevel
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get autoremove
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get clean
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  procmail postfix-mysql postfix-pgsql postfix-ldap postfix-pcre postfix-lmdb postfix-sqlite sasl2-bin | dovecot-common resolvconf postfix-cdb postfix-mta-sts-resolver
  postfix-doc
The following NEW packages will be installed:
  postfix
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 1245 kB of archives.
After this operation, 4180 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 postfix amd64 3.6.4-1ubuntu1.1 [1245 kB]
Fetched 1245 kB in 2s (756 kB/s)
Preconfiguring packages ...
Selecting previously unselected package postfix.
(Reading database ... 58430 files and directories currently installed.)
Preparing to unpack .../postfix_3.6.4-1ubuntu1.1_amd64.deb ...
Unpacking postfix (3.6.4-1ubuntu1.1) ...
Setting up postfix (3.6.4-1ubuntu1.1) ...
Adding group `postfix' (GID 119) ...
Done.
Adding system user `postfix' (UID 110) ...
Adding new user `postfix' (UID 110) with group `postfix' ...
Not creating home directory `/var/spool/postfix'.
Creating /etc/postfix/dynamicmaps.cf
Adding group `postdrop' (GID 120) ...
Done.
setting myhostname: DESKTOP-42SH73T.
setting alias maps
setting alias database
changing /etc/mailname to cwcorella@gmail.com
setting myorigin
setting destinations: cwcorella@gmail.com, $myhostname, DESKTOP-42SH73T., localhost., localhost
setting relayhost:
setting mynetworks: 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
setting mailbox_size_limit: 0
setting recipient_delimiter: +
setting inet_interfaces: loopback-only
setting default_transport: error
setting relay_transport: error
setting inet_protocols: all
WARNING: /etc/aliases exists, but does not have a root alias.

Postfix (main.cf) is now set up with a default configuration.  If you need to
make changes, edit /etc/postfix/main.cf (and others) as needed.  To view
Postfix configuration values, see postconf(1).

After modifying main.cf, be sure to run 'systemctl reload postfix'.

Running newaliases
newaliases: fatal: bad string length 0 < 1: mydomain =
dpkg: error processing package postfix (--configure):
 installed postfix package post-installation script subprocess returned error exit status 75
Processing triggers for ufw (0.36.1-4build1) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for rsyslog (8.2112.0-2ubuntu2.2) ...
invoke-rc.d: unknown initscript, /etc/init.d/rsyslog not found.
invoke-rc.d: could not determine current runlevel
Errors were encountered while processing:
 postfix
E: Sub-process /usr/bin/dpkg returned an error code (1)
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get --reinstall install postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
0 upgraded, 0 newly installed, 1 reinstalled, 0 to remove and 0 not upgraded.
1 not fully installed or removed.
After this operation, 0 B of additional disk space will be used.
E: Internal Error, No file name for postfix:amd64
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo dpkg --configure -a
Setting up postfix (3.6.4-1ubuntu1.1) ...

Postfix (main.cf) configuration was not changed.  If you need to make changes,
edit /etc/postfix/main.cf (and others) as needed.  To view Postfix
configuration values, see postconf(1).

After modifying main.cf, be sure to run 'systemctl reload postfix'.

Running newaliases
newaliases: fatal: bad string length 0 < 1: mydomain =
dpkg: error processing package postfix (--configure):
 installed postfix package post-installation script subprocess returned error exit status 75
Errors were encountered while processing:
 postfix
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo dpkg --list
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                                             Version                                 Architecture Description
+++-================================================-=======================================-============-===============================================================>
ii  adduser                                          3.118ubuntu5                            all          add and remove users and groups
ii  adwaita-icon-theme                               41.0-1ubuntu1                           all          default icon theme of GNOME (small subset)
ii  alsa-topology-conf                               1.2.5.1-2                               all          ALSA topology configuration files
ii  alsa-ucm-conf                                    1.2.6.3-1ubuntu1.5                      all          ALSA Use Case Manager configuration files
ii  alsa-utils                                       1.2.6-1ubuntu1                          amd64        Utilities for configuring and using ALSA
ii  apparmor                                         3.0.4-2ubuntu2.2                        amd64        user-space parser utility for AppArmor
ii  apport                                           2.20.11-0ubuntu82.4                     all          automatically generate crash reports for debugging
ii  apport-symptoms                                  0.24                                    all          symptom scripts for apport
ii  apt                                              2.4.9                                   amd64        commandline package manager
ii  apt-utils                                        2.4.9                                   amd64        package management related utility programs
ii  at-spi2-core                                     2.44.0-3                                amd64        Assistive Technology Service Provider Interface (dbus core)
ii  base-files                                       12ubuntu4.3                             amd64        Debian base system miscellaneous files
ii  base-passwd                                      3.5.52build1                            amd64        Debian base system master password and group files
ii  bash                                             5.1-6ubuntu1                            amd64        GNU Bourne Again SHell
ii  bash-completion                                  1:2.11-5ubuntu1                         all          programmable completion for the bash shell
ii  bind9-dnsutils                                   1:9.18.12-0ubuntu0.22.04.1              amd64        Clients provided with BIND 9
ii  bind9-host                                       1:9.18.12-0ubuntu0.22.04.1              amd64        DNS Lookup Utility
ii  bind9-libs:amd64                                 1:9.18.12-0ubuntu0.22.04.1              amd64        Shared Libraries used by BIND 9
ii  binutils                                         2.38-4ubuntu2.1                         amd64        GNU assembler, linker and binary utilities
ii  binutils-common:amd64                            2.38-4ubuntu2.1                         amd64        Common files for the GNU assembler, linker and binary utilities
ii  binutils-x86-64-linux-gnu                        2.38-4ubuntu2.1                         amd64        GNU binary utilities, for x86-64-linux-gnu target
ii  bridge-utils                                     1.7-1ubuntu3                            amd64        Utilities for configuring the Linux Ethernet bridge
ii  bsdextrautils                                    2.37.2-4ubuntu3                         amd64        extra utilities from 4.4BSD-Lite
ii  bsdutils                                         1:2.37.2-4ubuntu3                       amd64        basic utilities from 4.4BSD-Lite
ii  bubblewrap                                       0.6.1-1                                 amd64        utility for unprivileged chroot and namespace manipulation
ii  build-essential                                  12.9ubuntu3                             amd64        Informational list of build-essential packages
ii  buildah                                          1.23.1+ds1-2                            amd64        CLI tool to facilitate building OCI images
ii  busybox-static                                   1:1.30.1-7ubuntu3                       amd64        Standalone rescue shell with tons of builtin utilities
ii  byobu                                            5.133-1                                 all          text window manager, shell multiplexer, integrated DevOps envir>
ii  bzip2                                            1.0.8-5build1                           amd64        high-quality block-sorting file compressor - utilities
ii  ca-certificates                                  20211016ubuntu0.22.04.1                 all          Common CA certificates
ii  catatonit                                        0.1.7-1                                 amd64        init process for containers
ii  command-not-found                                22.04.0                                 all          Suggest installation of packages in interactive bash sessions
ii  conmon                                           2.0.25+ds1-1.1                          amd64        OCI container runtime monitor
ii  console-setup                                    1.205ubuntu3                            all          console font and keymap setup program
ii  console-setup-linux                              1.205ubuntu3                            all          Linux specific part of console-setup
ii  containerd                                       1.6.12-0ubuntu1~22.04.1                 amd64        daemon to control runC
ii  containernetworking-plugins                      0.9.1+ds1-1                             amd64        standard networking plugins - binaries
ii  coreutils                                        8.32-4.1ubuntu1                         amd64        GNU core utilities
ii  cpio                                             2.13+dfsg-7                             amd64        GNU cpio -- a program to manage archives of files
ii  cpp                                              4:11.2.0-1ubuntu1                       amd64        GNU C preprocessor (cpp)
ii  cpp-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C preprocessor
ii  cron                                             3.0pl1-137ubuntu3                       amd64        process scheduling daemon
ii  curl                                             7.81.0-1ubuntu1.10                      amd64        command line tool for transferring data with URL syntax
ii  dash                                             0.5.11+git20210903+057cd650a4ed-3build1 amd64        POSIX-compliant shell
ii  dbus                                             1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (daemon and utilities)
ii  dbus-user-session                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (systemd --user integratio>
ii  dbus-x11                                         1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (X11 deps)
ii  dconf-gsettings-backend:amd64                    0.40.0-3                                amd64        simple configuration storage system - GSettings back-end
ii  dconf-service                                    0.40.0-3                                amd64        simple configuration storage system - D-Bus service
ii  debconf                                          1.5.79ubuntu1                           all          Debian configuration management system
ii  debconf-i18n                                     1.5.79ubuntu1                           all          full internationalization support for debconf
ii  debianutils                                      5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  desktop-file-utils                               0.26-1ubuntu3                           amd64        Utilities for .desktop files
ii  diffutils                                        1:3.8-0ubuntu2                          amd64        File comparison utilities
ii  dirmngr                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - network certificate management service
ii  distro-info                                      1.1build1                               amd64        provides information about the distributions' releases
ii  distro-info-data                                 0.52ubuntu0.4                           all          information about the distributions' releases (data files)
ii  dmidecode                                        3.3-3ubuntu0.1                          amd64        SMBIOS/DMI table decoder
ii  dmsetup                                          2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  dns-root-data                                    2021011101                              all          DNS root data including root zone and DNSSEC key
ii  dnsmasq-base                                     2.86-1.1ubuntu0.3                       amd64        Small caching DNS proxy and DHCP/TFTP server
ii  docker-compose                                   1.29.2-1                                all          define and run multi-container Docker applications with YAML
ii  docker.io                                        20.10.21-0ubuntu1~22.04.3               amd64        Linux container runtime
ii  dos2unix                                         7.4.2-2                                 amd64        convert text file line endings between CRLF and LF
ii  dosfstools                                       4.2-1build3                             amd64        utilities for making and checking MS-DOS FAT filesystems
ii  dpkg                                             1.21.1ubuntu2.1                         amd64        Debian package management system
ii  dpkg-dev                                         1.21.1ubuntu2.1                         all          Debian package development tools
ii  e2fsprogs                                        1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system utilities
ii  ed                                               1.18-1                                  amd64        classic UNIX line editor
ii  eject                                            2.37.2-4ubuntu3                         amd64        ejects CDs and operates CD-Changers under Linux
ii  fakeroot                                         1.28-1ubuntu1                           amd64        tool for simulating superuser privileges
ii  fdisk                                            2.37.2-4ubuntu3                         amd64        collection of partitioning utilities
ii  ffmpeg                                           7:4.4.2-0ubuntu0.22.04.1                amd64        Tools for transcoding, streaming and playing of multimedia files
ii  file                                             1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers
ii  findutils                                        4.8.0-1ubuntu3                          amd64        utilities for finding files--find, xargs
ii  flex                                             2.6.4-8build2                           amd64        fast lexical analyzer generator
ii  fontconfig                                       2.13.1-4.2ubuntu5                       amd64        generic font configuration library - support binaries
ii  fontconfig-config                                2.13.1-4.2ubuntu5                       all          generic font configuration library - configuration
ii  fonts-dejavu-core                                2.37-2build1                            all          Vera font family derivate with additional characters
ii  fonts-droid-fallback                             1:6.0.1r16-1.1build1                    all          handheld device font with extensive style and language support >
ii  fonts-noto-mono                                  20201225-1build1                        all          "No Tofu" monospaced font family with large Unicode coverage
ii  fonts-ubuntu                                     0.83-6ubuntu1                           all          sans-serif font set from Ubuntu
ii  fonts-urw-base35                                 20200910-1                              all          font set metric-compatible with the 35 PostScript Level 2 Base >
ii  friendly-recovery                                0.2.42                                  all          Make recovery boot mode more user-friendly
ii  ftp                                              20210827-4build1                        all          dummy transitional package for tnftp
ii  fuse-overlayfs                                   1.7.1-1                                 amd64        implementation of overlay+shiftfs in FUSE for rootless containe>
ii  fuse3                                            3.10.5-1build1                          amd64        Filesystem in Userspace (3.x version)
ii  g++                                              4:11.2.0-1ubuntu1                       amd64        GNU C++ compiler
ii  g++-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C++ compiler
ii  gawk                                             1:5.1.0-1build3                         amd64        GNU awk, a pattern scanning and processing language
ii  gcc                                              4:11.2.0-1ubuntu1                       amd64        GNU C compiler
ii  gcc-11                                           11.3.0-1ubuntu1~22.04                   amd64        GNU C compiler
ii  gcc-11-base:amd64                                11.3.0-1ubuntu1~22.04                   amd64        GCC, the GNU Compiler Collection (base package)
ii  gcc-11-multilib                                  11.3.0-1ubuntu1~22.04                   amd64        GNU C compiler (multilib support)
ii  gcc-12-base:amd64                                12.1.0-2ubuntu1~22.04                   amd64        GCC, the GNU Compiler Collection (base package)
ii  gcc-multilib                                     4:11.2.0-1ubuntu1                       amd64        GNU C compiler (multilib files)
ii  gcr                                              3.40.0-4                                amd64        GNOME crypto services (daemon and tools)
ii  gdisk                                            1.0.8-4build1                           amd64        GPT fdisk text-mode partitioning tool
ii  gettext-base                                     0.21-4ubuntu4                           amd64        GNU Internationalization utilities for the base system
ii  ghostscript                                      9.55.0~dfsg1-0ubuntu5.2                 amd64        interpreter for the PostScript language and for PDF
ii  gir1.2-atk-1.0:amd64                             2.36.0-3build1                          amd64        ATK accessibility toolkit (GObject introspection)
ii  gir1.2-freedesktop:amd64                         1.72.0-1                                amd64        Introspection data for some FreeDesktop components
ii  gir1.2-gdkpixbuf-2.0:amd64                       2.42.8+dfsg-1ubuntu0.2                  amd64        GDK Pixbuf library - GObject-Introspection
ii  gir1.2-glib-2.0:amd64                            1.72.0-1                                amd64        Introspection data for GLib, GObject, Gio and GModule
ii  gir1.2-gst-plugins-base-1.0:amd64                1.20.1-1                                amd64        GObject introspection data for the GStreamer Plugins Base libra>
ii  gir1.2-gstreamer-1.0:amd64                       1.20.3-0ubuntu1                         amd64        GObject introspection data for the GStreamer library
ii  gir1.2-gtk-3.0:amd64                             3.24.33-1ubuntu2                        amd64        GTK graphical user interface library -- gir bindings
ii  gir1.2-gudev-1.0:amd64                           1:237-2build1                           amd64        libgudev-1.0 introspection data
ii  gir1.2-harfbuzz-0.0:amd64                        2.7.4-1ubuntu3.1                        amd64        OpenType text shaping engine (GObject introspection data)
ii  gir1.2-packagekitglib-1.0                        1.2.5-2ubuntu2                          amd64        GObject introspection data for the PackageKit GLib library
ii  gir1.2-pango-1.0:amd64                           1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text - gir bindings
ii  git                                              1:2.34.1-1ubuntu1.9                     amd64        fast, scalable, distributed revision control system
ii  git-man                                          1:2.34.1-1ubuntu1.9                     all          fast, scalable, distributed revision control system (manual pag>
ii  glib-networking:amd64                            2.72.0-1                                amd64        network-related giomodules for GLib
ii  glib-networking-common                           2.72.0-1                                all          network-related giomodules for GLib - data files
ii  glib-networking-services                         2.72.0-1                                amd64        network-related giomodules for GLib - D-Bus services
ii  gnome-desktop3-data                              42.5-0ubuntu1                           all          Common files for GNOME desktop apps
ii  gnome-keyring                                    40.0-3ubuntu3                           amd64        GNOME keyring services (daemon and tools)
ii  gnome-keyring-pkcs11:amd64                       40.0-3ubuntu3                           amd64        GNOME keyring module for the PKCS#11 module loading library
ii  gnupg                                            2.2.27-3ubuntu2.1                       all          GNU privacy guard - a free PGP replacement
ii  gnupg-l10n                                       2.2.27-3ubuntu2.1                       all          GNU privacy guard - localization files
ii  gnupg-utils                                      2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - utility programs
ii  gobject-introspection                            1.72.0-1                                amd64        Generate interface introspection data for GObject libraries
ii  golang-github-containernetworking-plugin-dnsname 1.3.1+ds1-2                             amd64        name resolution for containers
ii  golang-github-containers-common                  0.44.4+ds1-1                            all          Common files for github.com/containers repositories
ii  golang-github-containers-image                   5.16.0-3                                all          Configuration files and manpages for github.com/containers repo>
ii  gpg                                              2.2.27-3ubuntu2.1                       amd64        GNU Privacy Guard -- minimalist public key operations
ii  gpg-agent                                        2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - cryptographic agent
ii  gpg-wks-client                                   2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - Web Key Service client
ii  gpg-wks-server                                   2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - Web Key Service server
ii  gpgconf                                          2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - core configuration utilities
ii  gpgsm                                            2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - S/MIME version
ii  gpgv                                             2.2.27-3ubuntu2.1                       amd64        GNU privacy guard - signature verification tool
ii  graphicsmagick                                   1.4+really1.3.38-1ubuntu0.1             amd64        collection of image processing tools
ii  grep                                             3.7-1build1                             amd64        GNU grep, egrep and fgrep
ii  groff-base                                       1.22.4-8build1                          amd64        GNU troff text-formatting system (base system components)
ii  gsasl-common                                     1.10.0-5                                all          GNU SASL platform independent files
ii  gsettings-desktop-schemas                        42.0-1ubuntu1                           all          GSettings desktop-wide schemas
ii  gsfonts                                          1:8.11+urwcyr1.0.7~pre44-4.5            all          Fonts for the Ghostscript interpreter(s)
ii  gstreamer1.0-gl:amd64                            1.20.1-1                                amd64        GStreamer plugins for GL
ii  gstreamer1.0-plugins-base:amd64                  1.20.1-1                                amd64        GStreamer plugins from the "base" set
ii  gstreamer1.0-plugins-good:amd64                  1.20.3-0ubuntu1                         amd64        GStreamer plugins from the "good" set
ii  gstreamer1.0-x:amd64                             1.20.1-1                                amd64        GStreamer plugins for X11 and Pango
ii  gtk-update-icon-cache                            3.24.33-1ubuntu2                        amd64        icon theme caching utility
ii  guile-3.0-libs:amd64                             3.0.7-1                                 amd64        Core Guile libraries
ii  gvfs:amd64                                       1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - GIO module
ii  gvfs-backends                                    1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - backends
ii  gvfs-common                                      1.48.2-0ubuntu1                         all          userspace virtual filesystem - common data files
ii  gvfs-daemons                                     1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - servers
ii  gvfs-libs:amd64                                  1.48.2-0ubuntu1                         amd64        userspace virtual filesystem - private libraries
ii  gzip                                             1.10-4ubuntu4.1                         amd64        GNU compression utilities
ii  hdparm                                           9.60+ds-1build3                         amd64        tune hard disk parameters for high performance
ii  hicolor-icon-theme                               0.17-2                                  all          default fallback theme for FreeDesktop.org icon themes
ii  hostname                                         3.23ubuntu2                             amd64        utility to set/show the host name or domain name
ii  htop                                             3.0.5-7build2                           amd64        interactive processes viewer
ii  humanity-icon-theme                              0.6.16                                  all          Humanity Icon theme
ii  i965-va-driver:amd64                             2.4.1+dfsg1-1                           amd64        VAAPI driver for Intel G45 & HD Graphics family
ii  imagemagick-6-common                             8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     all          image manipulation programs -- infrastructure
ii  imagemagick-6.q16                                8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation programs -- quantum depth Q16
ii  imagemagick-6.q16hdri                            8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation programs -- quantum depth Q16HDRI
ii  info                                             6.8-4build1                             amd64        Standalone GNU Info documentation browser
ii  init                                             1.62                                    amd64        metapackage ensuring an init system is installed
ii  init-system-helpers                              1.62                                    all          helper tools for all init systems
ii  install-info                                     6.8-4build1                             amd64        Manage installed documentation in info format
ii  intel-media-va-driver:amd64                      22.3.1+dfsg1-1ubuntu1                   amd64        VAAPI driver for the Intel GEN8+ Graphics family
ii  iproute2                                         5.15.0-1ubuntu2                         amd64        networking and traffic control tools
ii  iptables                                         1.8.7-1ubuntu5                          amd64        administration tools for packet filtering and NAT
ii  iputils-ping                                     3:20211215-1                            amd64        Tools to test the reachability of network hosts
ii  iputils-tracepath                                3:20211215-1                            amd64        Tools to trace the network path to a remote host
ii  irqbalance                                       1.8.0-1build1                           amd64        Daemon to balance interrupts for SMP systems
ii  isc-dhcp-client                                  4.4.1-2.3ubuntu2.4                      amd64        DHCP client for automatically obtaining an IP address
ii  isc-dhcp-common                                  4.4.1-2.3ubuntu2.4                      amd64        common manpages relevant to all of the isc-dhcp packages
ii  iso-codes                                        4.9.0-1                                 all          ISO language, territory, currency, script codes and their trans>
ii  javascript-common                                11+nmu1                                 all          Base support for JavaScript library packages
ii  jupyter-core                                     4.9.1-1                                 all          Core common functionality of Jupyter projects (tools)
ii  kbd                                              2.3.0-3ubuntu4.22.04                    amd64        Linux console font and keytable utilities
ii  keyboard-configuration                           1.205ubuntu3                            all          system-wide keyboard preferences
ii  kmod                                             29-1ubuntu1                             amd64        tools for managing Linux kernel modules
ii  less                                             590-1ubuntu0.22.04.1                    amd64        pager program similar to more
ii  lib32asan6                                       11.3.0-1ubuntu1~22.04                   amd64        AddressSanitizer -- a fast memory error detector (32bit)
ii  lib32atomic1                                     12.1.0-2ubuntu1~22.04                   amd64        support library providing __atomic built-in functions (32bit)
ii  lib32gcc-11-dev                                  11.3.0-1ubuntu1~22.04                   amd64        GCC support library (32 bit development files)
ii  lib32gcc-s1                                      12.1.0-2ubuntu1~22.04                   amd64        GCC support library (32 bit Version)
ii  lib32gomp1                                       12.1.0-2ubuntu1~22.04                   amd64        GCC OpenMP (GOMP) support library (32bit)
ii  lib32itm1                                        12.1.0-2ubuntu1~22.04                   amd64        GNU Transactional Memory Library (32bit)
ii  lib32quadmath0                                   12.1.0-2ubuntu1~22.04                   amd64        GCC Quad-Precision Math Library (32bit)
ii  lib32stdc++6                                     12.1.0-2ubuntu1~22.04                   amd64        GNU Standard C++ Library v3 (32 bit Version)
ii  lib32ubsan1                                      12.1.0-2ubuntu1~22.04                   amd64        UBSan -- undefined behaviour sanitizer (32bit)
ii  libaa1:amd64                                     1.4p5-50build1                          amd64        ASCII art library
ii  libaacs0:amd64                                   0.11.1-1                                amd64        free-and-libre implementation of AACS
ii  libacl1:amd64                                    2.3.1-1                                 amd64        access control list - shared library
ii  libalgorithm-diff-perl                           1.201-1                                 all          module to find differences between files
ii  libalgorithm-diff-xs-perl                        0.04-6build3                            amd64        module to find differences between files (XS accelerated)
ii  libalgorithm-merge-perl                          0.08-3                                  all          Perl module for three-way merge of textual data
ii  libaom3:amd64                                    3.3.0-1                                 amd64        AV1 Video Codec Library
ii  libapparmor1:amd64                               3.0.4-2ubuntu2.2                        amd64        changehat AppArmor library
ii  libappstream4:amd64                              0.15.2-2                                amd64        Library to access AppStream services
ii  libapt-pkg6.0:amd64                              2.4.9                                   amd64        package management runtime library
ii  libarchive13:amd64                               3.6.0-1ubuntu1                          amd64        Multi-format archive and compression library (shared library)
ii  libargon2-1:amd64                                0~20171227-0.3                          amd64        memory-hard hashing function - runtime library
ii  libasan6:amd64                                   11.3.0-1ubuntu1~22.04                   amd64        AddressSanitizer -- a fast memory error detector
ii  libasound2:amd64                                 1.2.6.1-1ubuntu1                        amd64        shared library for ALSA applications
ii  libasound2-data                                  1.2.6.1-1ubuntu1                        all          Configuration files and profiles for ALSA drivers
ii  libasound2-dev:amd64                             1.2.6.1-1ubuntu1                        amd64        shared library for ALSA applications -- development files
ii  libass9:amd64                                    1:0.15.2-1                              amd64        library for SSA/ASS subtitles rendering
ii  libassuan0:amd64                                 2.5.5-1build1                           amd64        IPC library for the GnuPG components
ii  libasyncns0:amd64                                0.8-6build2                             amd64        Asynchronous name service query library
ii  libatasmart4:amd64                               0.19-5build2                            amd64        ATA S.M.A.R.T. reading and parsing library
ii  libatk-bridge2.0-0:amd64                         2.38.0-3                                amd64        AT-SPI 2 toolkit bridge - shared library
ii  libatk1.0-0:amd64                                2.36.0-3build1                          amd64        ATK accessibility toolkit
ii  libatk1.0-data                                   2.36.0-3build1                          all          Common files for the ATK accessibility toolkit
ii  libatm1:amd64                                    1:2.5.1-4build2                         amd64        shared library for ATM (Asynchronous Transfer Mode)
ii  libatomic1:amd64                                 12.1.0-2ubuntu1~22.04                   amd64        support library providing __atomic built-in functions
ii  libatopology2:amd64                              1.2.6.1-1ubuntu1                        amd64        shared library for handling ALSA topology definitions
ii  libatspi2.0-0:amd64                              2.44.0-3                                amd64        Assistive Technology Service Provider Interface - shared library
ii  libattr1:amd64                                   1:2.5.1-1build1                         amd64        extended attribute handling - shared library
ii  libaudit-common                                  1:3.0.7-1build1                         all          Dynamic library for security auditing - common files
ii  libaudit1:amd64                                  1:3.0.7-1build1                         amd64        Dynamic library for security auditing
ii  libavahi-client3:amd64                           0.8-5ubuntu5                            amd64        Avahi client library
ii  libavahi-common-data:amd64                       0.8-5ubuntu5                            amd64        Avahi common data files
ii  libavahi-common3:amd64                           0.8-5ubuntu5                            amd64        Avahi common library
ii  libavahi-glib1:amd64                             0.8-5ubuntu5                            amd64        Avahi GLib integration library
ii  libavc1394-0:amd64                               0.5.4-5build2                           amd64        control IEEE 1394 audio/video devices
ii  libavcodec58:amd64                               7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library with de/encoders for audio/video codecs - runtim>
ii  libavdevice58:amd64                              7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for handling input and output devices - runtime >
ii  libavfilter7:amd64                               7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library containing media filters - runtime files
ii  libavformat58:amd64                              7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library with (de)muxers for multimedia containers - runt>
ii  libavutil56:amd64                                7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library with functions for simplifying programming - run>
ii  libbdplus0:amd64                                 0.2.0-1                                 amd64        implementation of BD+ for reading Blu-ray Discs
ii  libbinutils:amd64                                2.38-4ubuntu2.1                         amd64        GNU binary utilities (private shared library)
ii  libblas3:amd64                                   3.10.0-2ubuntu1                         amd64        Basic Linear Algebra Reference implementations, shared library
ii  libblkid-dev:amd64                               2.37.2-4ubuntu3                         amd64        block device ID library - headers
ii  libblkid1:amd64                                  2.37.2-4ubuntu3                         amd64        block device ID library
ii  libblockdev-crypto2:amd64                        2.26-1                                  amd64        Crypto plugin for libblockdev
ii  libblockdev-fs2:amd64                            2.26-1                                  amd64        file system plugin for libblockdev
ii  libblockdev-loop2:amd64                          2.26-1                                  amd64        Loop device plugin for libblockdev
ii  libblockdev-part-err2:amd64                      2.26-1                                  amd64        Partition error utility functions for libblockdev
ii  libblockdev-part2:amd64                          2.26-1                                  amd64        Partitioning plugin for libblockdev
ii  libblockdev-swap2:amd64                          2.26-1                                  amd64        Swap plugin for libblockdev
ii  libblockdev-utils2:amd64                         2.26-1                                  amd64        Utility functions for libblockdev
ii  libblockdev2:amd64                               2.26-1                                  amd64        Library for manipulating block devices
ii  libbluray2:amd64                                 1:1.3.1-1                               amd64        Blu-ray disc playback support library (shared library)
ii  libbpf0:amd64                                    1:0.5.0-1ubuntu22.04.1                  amd64        eBPF helper library (shared library)
ii  libbrotli-dev:amd64                              1.0.9-2build6                           amd64        library implementing brotli encoder and decoder (development fi>
ii  libbrotli1:amd64                                 1.0.9-2build6                           amd64        library implementing brotli encoder and decoder (shared librari>
ii  libbs2b0:amd64                                   3.1.0+dfsg-2.2build1                    amd64        Bauer stereophonic-to-binaural DSP library
ii  libbsd0:amd64                                    0.11.5-1                                amd64        utility functions from BSD systems - shared library
ii  libbz2-1.0:amd64                                 1.0.8-5build1                           amd64        high-quality block-sorting file compressor library - runtime
ii  libc-bin                                         2.35-0ubuntu3.1                         amd64        GNU C Library: Binaries
ii  libc-dev-bin                                     2.35-0ubuntu3.1                         amd64        GNU C Library: Development binaries
ii  libc-devtools                                    2.35-0ubuntu3.1                         amd64        GNU C Library: Development tools
ii  libc6:amd64                                      2.35-0ubuntu3.1                         amd64        GNU C Library: Shared libraries
ii  libc6-dev:amd64                                  2.35-0ubuntu3.1                         amd64        GNU C Library: Development Libraries and Header Files
ii  libc6-dev-i386                                   2.35-0ubuntu3.1                         amd64        GNU C Library: 32-bit development libraries for AMD64
ii  libc6-dev-x32                                    2.35-0ubuntu3.1                         amd64        GNU C Library: X32 ABI Development Libraries for AMD64
ii  libc6-i386                                       2.35-0ubuntu3.1                         amd64        GNU C Library: 32-bit shared libraries for AMD64
ii  libc6-x32                                        2.35-0ubuntu3.1                         amd64        GNU C Library: X32 ABI Shared libraries for AMD64
ii  libcaca0:amd64                                   0.99.beta19-2.2ubuntu4                  amd64        colour ASCII art library
ii  libcairo-gobject2:amd64                          1.16.0-5ubuntu2                         amd64        Cairo 2D vector graphics library (GObject library)
ii  libcairo-script-interpreter2:amd64               1.16.0-5ubuntu2                         amd64        Cairo 2D vector graphics library (script interpreter)
ii  libcairo2:amd64                                  1.16.0-5ubuntu2                         amd64        Cairo 2D vector graphics library
ii  libcairo2-dev:amd64                              1.16.0-5ubuntu2                         amd64        Development files for the Cairo 2D graphics library
ii  libcap-ng0:amd64                                 0.7.9-2.2build3                         amd64        An alternate POSIX capabilities library
ii  libcap2:amd64                                    1:2.44-1build3                          amd64        POSIX 1003.1e capabilities (library)
ii  libcap2-bin                                      1:2.44-1build3                          amd64        POSIX 1003.1e capabilities (utilities)
ii  libcbor0.8:amd64                                 0.8.0-2ubuntu1                          amd64        library for parsing and generating CBOR (RFC 7049)
ii  libcc1-0:amd64                                   12.1.0-2ubuntu1~22.04                   amd64        GCC cc1 plugin for GDB
ii  libcdio-cdda2:amd64                              10.2+2.0.0-1build3                      amd64        library to read and control digital audio CDs
ii  libcdio-paranoia2:amd64                          10.2+2.0.0-1build3                      amd64        library to read digital audio CDs with error correction
ii  libcdio19:amd64                                  2.1.0-3build1                           amd64        library to read and control CD-ROM
ii  libcdparanoia0:amd64                             3.10.2+debian-14build2                  amd64        audio extraction tool for sampling CDs (library)
ii  libchromaprint1:amd64                            1.5.1-2                                 amd64        audio fingerprint library
ii  libcodec2-1.0:amd64                              1.0.1-3                                 amd64        Codec2 runtime library
ii  libcolord2:amd64                                 1.4.6-1                                 amd64        system service to manage device colour profiles -- runtime
ii  libcom-err2:amd64                                1.46.5-2ubuntu1.1                       amd64        common error description library
ii  libcrypt-dev:amd64                               1:4.4.27-1                              amd64        libcrypt development files
ii  libcrypt1:amd64                                  1:4.4.27-1                              amd64        libcrypt shared library
ii  libcryptsetup12:amd64                            2:2.4.3-1ubuntu1.1                      amd64        disk encryption support - shared library
ii  libctf-nobfd0:amd64                              2.38-4ubuntu2.1                         amd64        Compact C Type Format library (runtime, no BFD dependency)
ii  libctf0:amd64                                    2.38-4ubuntu2.1                         amd64        Compact C Type Format library (runtime, BFD dependency)
ii  libcue2:amd64                                    2.2.1-3build3                           amd64        CUE Sheet Parser Library
ii  libcups2:amd64                                   2.4.1op1-1ubuntu4.1                     amd64        Common UNIX Printing System(tm) - Core library
ii  libcurl3-gnutls:amd64                            7.81.0-1ubuntu1.10                      amd64        easy-to-use client-side URL transfer library (GnuTLS flavour)
ii  libcurl4:amd64                                   7.81.0-1ubuntu1.10                      amd64        easy-to-use client-side URL transfer library (OpenSSL flavour)
ii  libdatrie1:amd64                                 0.2.13-2                                amd64        Double-array trie library
ii  libdav1d5:amd64                                  0.9.2-1                                 amd64        fast and small AV1 video stream decoder (shared library)
ii  libdb5.3:amd64                                   5.3.28+dfsg1-0.8ubuntu3                 amd64        Berkeley v5.3 Database Libraries [runtime]
ii  libdbus-1-3:amd64                                1.12.20-2ubuntu4.1                      amd64        simple interprocess messaging system (library)
ii  libdbusmenu-glib4:amd64                          16.04.1+18.10.20180917-0ubuntu8         amd64        library for passing menus over DBus
ii  libdc1394-25:amd64                               2.2.6-4                                 amd64        high level programming interface for IEEE 1394 digital cameras
ii  libdconf1:amd64                                  0.40.0-3                                amd64        simple configuration storage system - runtime library
ii  libde265-0:amd64                                 1.0.8-1                                 amd64        Open H.265 video codec implementation
ii  libdebconfclient0:amd64                          0.261ubuntu1                            amd64        Debian Configuration Management System (C-implementation librar>
ii  libdecor-0-0:amd64                               0.1.0-3build1                           amd64        client-side window decoration library
ii  libdecor-0-plugin-1-cairo:amd64                  0.1.0-3build1                           amd64        default decoration plugin
ii  libdee-1.0-4:amd64                               1.2.7+17.10.20170616-6ubuntu4           amd64        Model to synchronize multiple instances over DBus - shared lib
ii  libdeflate0:amd64                                1.10-2                                  amd64        fast, whole-buffer DEFLATE-based compression and decompression
ii  libdevmapper1.02.1:amd64                         2:1.02.175-2.1ubuntu4                   amd64        Linux Kernel Device Mapper userspace library
ii  libdjvulibre-text                                3.5.28-2build2                          all          Linguistic support files for libdjvulibre
ii  libdjvulibre21:amd64                             3.5.28-2build2                          amd64        Runtime support for the DjVu image format
ii  libdns-export1110                                1:9.11.19+dfsg-2.1ubuntu3               amd64        Exported DNS Shared Library
ii  libdpkg-perl                                     1.21.1ubuntu2.1                         all          Dpkg perl modules
ii  libdrm-amdgpu1:amd64                             2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to amdgpu-specific kernel DRM services -- r>
ii  libdrm-common                                    2.4.113-2~ubuntu0.22.04.1               all          Userspace interface to kernel DRM services -- common files
ii  libdrm-dev:amd64                                 2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to kernel DRM services -- development files
ii  libdrm-intel1:amd64                              2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to intel-specific kernel DRM services -- ru>
ii  libdrm-nouveau2:amd64                            2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to nouveau-specific kernel DRM services -- >
ii  libdrm-radeon1:amd64                             2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to radeon-specific kernel DRM services -- r>
ii  libdrm2:amd64                                    2.4.113-2~ubuntu0.22.04.1               amd64        Userspace interface to kernel DRM services -- runtime
ii  libdv4:amd64                                     1.0.0-14build1                          amd64        software library for DV format digital video (runtime lib)
ii  libdw-dev:amd64                                  0.186-1build1                           amd64        libdw1 development libraries and header files
ii  libdw1:amd64                                     0.186-1build1                           amd64        library that provides access to the DWARF debug information
ii  libedit2:amd64                                   3.1-20210910-1build1                    amd64        BSD editline and history libraries
ii  libegl-dev:amd64                                 1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- EGL development files
ii  libegl-mesa0:amd64                               22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the EGL API -- Mesa vendor library
ii  libegl1:amd64                                    1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- EGL support
ii  libelf-dev:amd64                                 0.186-1build1                           amd64        libelf1 development libraries and header files
ii  libelf1:amd64                                    0.186-1build1                           amd64        library to read and write ELF files
ii  libepoxy0:amd64                                  1.5.10-1                                amd64        OpenGL function pointer management library
ii  liberror-perl                                    0.17029-1                               all          Perl module for error/exception handling in an OO-ish way
ii  libestr0:amd64                                   0.1.10-2.1build3                        amd64        Helper functions for handling strings (lib)
ii  libevent-core-2.1-7:amd64                        2.1.12-stable-1build3                   amd64        Asynchronous event notification library (core)
ii  libexempi8:amd64                                 2.5.2-1ubuntu0.22.04.1                  amd64        library to parse XMP metadata (Library)
ii  libexif12:amd64                                  0.6.24-1build1                          amd64        library to parse EXIF files
ii  libexiv2-27:amd64                                0.27.5-3ubuntu1                         amd64        EXIF/IPTC/XMP metadata manipulation library
ii  libexpat1:amd64                                  2.4.7-1ubuntu0.2                        amd64        XML parsing C library - runtime library
ii  libexpat1-dev:amd64                              2.4.7-1ubuntu0.2                        amd64        XML parsing C library - development kit
ii  libext2fs2:amd64                                 1.46.5-2ubuntu1.1                       amd64        ext2/ext3/ext4 file system libraries
ii  libfakeroot:amd64                                1.28-1ubuntu1                           amd64        tool for simulating superuser privileges - shared libraries
ii  libfastjson4:amd64                               0.99.9-1build2                          amd64        fast json library for C
ii  libfdisk1:amd64                                  2.37.2-4ubuntu3                         amd64        fdisk partitioning library
ii  libffi-dev:amd64                                 3.4.2-4                                 amd64        Foreign Function Interface library (development files)
ii  libffi8:amd64                                    3.4.2-4                                 amd64        Foreign Function Interface library runtime
ii  libfftw3-double3:amd64                           3.3.8-2ubuntu8                          amd64        Library for computing Fast Fourier Transforms - Double precision
ii  libfftw3-single3:amd64                           3.3.8-2ubuntu8                          amd64        Library for computing Fast Fourier Transforms - Single precision
ii  libfido2-1:amd64                                 1.10.0-1                                amd64        library for generating and verifying FIDO 2.0 objects
ii  libfile-fcntllock-perl                           0.22-3build7                            amd64        Perl module for file locking with fcntl(2)
ii  libfl-dev:amd64                                  2.6.4-8build2                           amd64        static library for flex (a fast lexical analyzer generator)
ii  libfl2:amd64                                     2.6.4-8build2                           amd64        SHARED library for flex (a fast lexical analyzer generator)
ii  libflac8:amd64                                   1.3.3-2ubuntu0.1                        amd64        Free Lossless Audio Codec - runtime C library
ii  libflite1:amd64                                  2.2-3                                   amd64        Small run-time speech synthesis engine - shared libraries
ii  libfontconfig-dev:amd64                          2.13.1-4.2ubuntu5                       amd64        generic font configuration library - development
ii  libfontconfig1:amd64                             2.13.1-4.2ubuntu5                       amd64        generic font configuration library - runtime
ii  libfontconfig1-dev:amd64                         2.13.1-4.2ubuntu5                       amd64        generic font configuration library - dummy package
ii  libfreetype-dev:amd64                            2.11.1+dfsg-1ubuntu0.1                  amd64        FreeType 2 font engine, development files
ii  libfreetype6:amd64                               2.11.1+dfsg-1ubuntu0.1                  amd64        FreeType 2 font engine, shared library files
ii  libfreetype6-dev:amd64                           2.11.1+dfsg-1ubuntu0.1                  amd64        FreeType 2 font engine, development files (transitional package)
ii  libfribidi0:amd64                                1.0.8-2ubuntu3.1                        amd64        Free Implementation of the Unicode BiDi algorithm
ii  libfuse3-3:amd64                                 3.10.5-1build1                          amd64        Filesystem in Userspace (library) (3.x version)
ii  libgbm-dev:amd64                                 22.2.5-0ubuntu0.1~22.04.1               amd64        generic buffer management API -- development files
ii  libgbm1:amd64                                    22.2.5-0ubuntu0.1~22.04.1               amd64        generic buffer management API -- runtime
ii  libgc1:amd64                                     1:8.0.6-1.1build1                       amd64        conservative garbage collector for C and C++
ii  libgcc-11-dev:amd64                              11.3.0-1ubuntu1~22.04                   amd64        GCC support library (development files)
ii  libgcc-s1:amd64                                  12.1.0-2ubuntu1~22.04                   amd64        GCC support library
ii  libgck-1-0:amd64                                 3.40.0-4                                amd64        Glib wrapper library for PKCS#11 - runtime
ii  libgcr-base-3-1:amd64                            3.40.0-4                                amd64        Library for Crypto related tasks
ii  libgcr-ui-3-1:amd64                              3.40.0-4                                amd64        Library for Crypto UI related tasks
ii  libgcrypt20:amd64                                1.9.4-3ubuntu3                          amd64        LGPL Crypto library - runtime library
ii  libgd3:amd64                                     2.3.0-2ubuntu2                          amd64        GD Graphics Library
ii  libgdata-common                                  0.18.1-2build1                          all          Library for accessing GData webservices - common data files
ii  libgdata22:amd64                                 0.18.1-2build1                          amd64        Library for accessing GData webservices - shared libraries
ii  libgdbm-compat4:amd64                            1.23-1                                  amd64        GNU dbm database routines (legacy support runtime version)
ii  libgdbm6:amd64                                   1.23-1                                  amd64        GNU dbm database routines (runtime version)
ii  libgdk-pixbuf-2.0-0:amd64                        2.42.8+dfsg-1ubuntu0.2                  amd64        GDK Pixbuf library
ii  libgdk-pixbuf2.0-bin                             2.42.8+dfsg-1ubuntu0.2                  amd64        GDK Pixbuf library (thumbnailer)
ii  libgdk-pixbuf2.0-common                          2.42.8+dfsg-1ubuntu0.2                  all          GDK Pixbuf library - data files
ii  libgexiv2-2:amd64                                0.14.0-1build1                          amd64        GObject-based wrapper around the Exiv2 library
ii  libgfortran5:amd64                               12.1.0-2ubuntu1~22.04                   amd64        Runtime library for GNU Fortran applications
ii  libgif7:amd64                                    5.1.9-2build2                           amd64        library for GIF images (library)
ii  libgirepository-1.0-1:amd64                      1.72.0-1                                amd64        Library for handling GObject introspection data (runtime librar>
ii  libgirepository1.0-dev:amd64                     1.72.0-1                                amd64        Library for handling GObject introspection data (development fi>
ii  libgl-dev:amd64                                  1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GL development files
ii  libgl1:amd64                                     1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- legacy GL support
ii  libgl1-amber-dri:amd64                           21.3.7-0ubuntu1                         amd64        free implementation of the OpenGL API -- DRI modules
ii  libgl1-mesa-dri:amd64                            22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the OpenGL API -- DRI modules
ii  libglapi-mesa:amd64                              22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the GL API -- shared library
ii  libgles-dev:amd64                                1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLES development files
ii  libgles1:amd64                                   1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLESv1 support
ii  libgles2:amd64                                   1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLESv2 support
ii  libglib2.0-0:amd64                               2.72.4-0ubuntu2                         amd64        GLib library of C routines
ii  libglib2.0-bin                                   2.72.4-0ubuntu2                         amd64        Programs for the GLib library
ii  libglib2.0-data                                  2.72.4-0ubuntu2                         all          Common files for GLib library
ii  libglib2.0-dev:amd64                             2.72.4-0ubuntu2                         amd64        Development files for the GLib library
ii  libglib2.0-dev-bin                               2.72.4-0ubuntu2                         amd64        Development utilities for the GLib library
ii  libglvnd0:amd64                                  1.4.0-1                                 amd64        Vendor neutral GL dispatch library
ii  libglx-dev:amd64                                 1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLX development files
ii  libglx-mesa0:amd64                               22.2.5-0ubuntu0.1~22.04.1               amd64        free implementation of the OpenGL API -- GLX vendor library
ii  libglx0:amd64                                    1.4.0-1                                 amd64        Vendor neutral GL dispatch library -- GLX support
ii  libgme0:amd64                                    0.6.3-2                                 amd64        Playback library for video game music files - shared library
ii  libgmp10:amd64                                   2:6.2.1+dfsg-3ubuntu1                   amd64        Multiprecision arithmetic library
ii  libgnome-autoar-0-0:amd64                        0.4.3-1                                 amd64        Archives integration support for GNOME
ii  libgnome-desktop-3-19:amd64                      42.5-0ubuntu1                           amd64        Utility library for the GNOME desktop - GTK 3 version
ii  libgnutls30:amd64                                3.7.3-4ubuntu1.2                        amd64        GNU TLS library - main runtime library
ii  libgoa-1.0-0b:amd64                              3.44.0-1ubuntu1                         amd64        library for GNOME Online Accounts
ii  libgoa-1.0-common                                3.44.0-1ubuntu1                         all          library for GNOME Online Accounts - common files
ii  libgomp1:amd64                                   12.1.0-2ubuntu1~22.04                   amd64        GCC OpenMP (GOMP) support library
ii  libgpg-error0:amd64                              1.43-3                                  amd64        GnuPG development runtime library
ii  libgpgme11:amd64                                 1.16.0-1.2ubuntu4                       amd64        GPGME - GnuPG Made Easy (library)
ii  libgphoto2-6:amd64                               2.5.27-1build2                          amd64        gphoto2 digital camera library
ii  libgphoto2-l10n                                  2.5.27-1build2                          all          gphoto2 digital camera library - localized messages
ii  libgphoto2-port12:amd64                          2.5.27-1build2                          amd64        gphoto2 digital camera port library
ii  libgpm2:amd64                                    1.20.7-10build1                         amd64        General Purpose Mouse - shared library
ii  libgraphene-1.0-0:amd64                          1.10.8-1                                amd64        library of graphic data types
ii  libgraphicsmagick-q16-3                          1.4+really1.3.38-1ubuntu0.1             amd64        format-independent image processing - C shared library
ii  libgraphite2-3:amd64                             1.3.14-1build2                          amd64        Font rendering engine for Complex Scripts -- library
ii  libgs9:amd64                                     9.55.0~dfsg1-0ubuntu5.2                 amd64        interpreter for the PostScript language and for PDF - Library
ii  libgs9-common                                    9.55.0~dfsg1-0ubuntu5.2                 all          interpreter for the PostScript language and for PDF - common fi>
ii  libgsasl7:amd64                                  1.10.0-5                                amd64        GNU SASL library
ii  libgsf-1-114:amd64                               1.14.47-1build2                         amd64        Structured File Library - runtime version
ii  libgsf-1-common                                  1.14.47-1build2                         all          Structured File Library - common files
ii  libgsm1:amd64                                    1.0.19-1                                amd64        Shared libraries for GSM speech compressor
ii  libgssapi-krb5-2:amd64                           1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries - krb5 GSS-API Mechanism
ii  libgstreamer-gl1.0-0:amd64                       1.20.1-1                                amd64        GStreamer GL libraries
ii  libgstreamer-plugins-base1.0-0:amd64             1.20.1-1                                amd64        GStreamer libraries from the "base" set
ii  libgstreamer-plugins-base1.0-dev:amd64           1.20.1-1                                amd64        GStreamer development files for libraries from the "base" set
ii  libgstreamer-plugins-good1.0-0:amd64             1.20.3-0ubuntu1                         amd64        GStreamer development files for libraries from the "good" set
ii  libgstreamer1.0-0:amd64                          1.20.3-0ubuntu1                         amd64        Core GStreamer libraries and elements
ii  libgstreamer1.0-dev:amd64                        1.20.3-0ubuntu1                         amd64        GStreamer core development files
ii  libgtk-3-0:amd64                                 3.24.33-1ubuntu2                        amd64        GTK graphical user interface library
ii  libgtk-3-bin                                     3.24.33-1ubuntu2                        amd64        programs for the GTK graphical user interface library
ii  libgtk-3-common                                  3.24.33-1ubuntu2                        all          common files for the GTK graphical user interface library
ii  libgudev-1.0-0:amd64                             1:237-2build1                           amd64        GObject-based wrapper library for libudev
ii  libgudev-1.0-dev:amd64                           1:237-2build1                           amd64        libgudev-1.0 development files
ii  libgxps2:amd64                                   0.3.2-2                                 amd64        handling and rendering XPS documents (library)
ii  libhandy-1-0:amd64                               1.6.1-1                                 amd64        Library with GTK widgets for mobile phones
ii  libharfbuzz0b:amd64                              2.7.4-1ubuntu3.1                        amd64        OpenType text shaping engine (shared library)
ii  libheif1:amd64                                   1.12.0-2build1                          amd64        ISO/IEC 23008-12:2017 HEIF file format decoder - shared library
ii  libhogweed6:amd64                                3.7.3-1build2                           amd64        low level cryptographic library (public-key cryptos)
ii  libice-dev:amd64                                 2:1.0.10-1build2                        amd64        X11 Inter-Client Exchange library (development headers)
ii  libice6:amd64                                    2:1.0.10-1build2                        amd64        X11 Inter-Client Exchange library
ii  libicu70:amd64                                   70.1-2                                  amd64        International Components for Unicode
ii  libidn12:amd64                                   1.38-4build1                            amd64        GNU Libidn library, implementation of IETF IDN specifications
ii  libidn2-0:amd64                                  2.3.2-2build1                           amd64        Internationalized domain names (IDNA2008/TR46) library
ii  libiec61883-0:amd64                              1.2.0-4build3                           amd64        partial implementation of IEC 61883 (shared lib)
ii  libigdgmm12:amd64                                22.1.2+ds1-1                            amd64        Intel Graphics Memory Management Library -- shared library
ii  libijs-0.35:amd64                                0.35-15build2                           amd64        IJS raster image transport protocol: shared library
ii  libilmbase25:amd64                               2.5.7-2                                 amd64        several utility libraries from ILM used by OpenEXR
ii  libimobiledevice6:amd64                          1.3.0-6build3                           amd64        Library for communicating with iPhone and other Apple devices
ii  libip4tc2:amd64                                  1.8.7-1ubuntu5                          amd64        netfilter libip4tc library
ii  libip6tc2:amd64                                  1.8.7-1ubuntu5                          amd64        netfilter libip6tc library
ii  libisc-export1105:amd64                          1:9.11.19+dfsg-2.1ubuntu3               amd64        Exported ISC Shared Library
ii  libisl23:amd64                                   0.24-2build1                            amd64        manipulating sets and relations of integer points bounded by li>
ii  libitm1:amd64                                    12.1.0-2ubuntu1~22.04                   amd64        GNU Transactional Memory Library
ii  libjack-dev                                      1:0.125.0-3build2                       amd64        JACK Audio Connection Kit (development files)
ii  libjack0:amd64                                   1:0.125.0-3build2                       amd64        JACK Audio Connection Kit (libraries)
ii  libjansson4:amd64                                2.13.1-1.1build3                        amd64        C library for encoding, decoding and manipulating JSON data
ii  libjbig0:amd64                                   2.1-3.1ubuntu0.22.04.1                  amd64        JBIGkit libraries
ii  libjbig2dec0:amd64                               0.19-3build2                            amd64        JBIG2 decoder library - shared libraries
ii  libjpeg-turbo8:amd64                             2.1.2-0ubuntu1                          amd64        IJG JPEG compliant runtime library.
ii  libjpeg8:amd64                                   8c-2ubuntu10                            amd64        Independent JPEG Group's JPEG runtime library (dependency packa>
ii  libjs-jquery                                     3.6.0+dfsg+~3.5.13-1                    all          JavaScript library for dynamic web applications
ii  libjs-sphinxdoc                                  4.3.2-1                                 all          JavaScript support for Sphinx documentation
ii  libjs-underscore                                 1.13.2~dfsg-2                           all          JavaScript's functional programming helper library
ii  libjson-c5:amd64                                 0.15-3~ubuntu1.22.04.1                  amd64        JSON manipulation library - shared library
ii  libjson-glib-1.0-0:amd64                         1.6.6-1build1                           amd64        GLib JSON manipulation library
ii  libjson-glib-1.0-common                          1.6.6-1build1                           all          GLib JSON manipulation library (common files)
ii  libjxr-tools                                     1.2~git20170615.f752187-5               amd64        JPEG-XR lib - command line apps
ii  libjxr0:amd64                                    1.2~git20170615.f752187-5               amd64        JPEG-XR lib - libraries
ii  libk5crypto3:amd64                               1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries - Crypto Library
ii  libkeyutils1:amd64                               1.6.1-2ubuntu3                          amd64        Linux Key Management Utilities (library)
ii  libkmod2:amd64                                   29-1ubuntu1                             amd64        libkmod shared library
ii  libkrb5-3:amd64                                  1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries
ii  libkrb5support0:amd64                            1.19.2-2ubuntu0.1                       amd64        MIT Kerberos runtime libraries - Support library
ii  libksba8:amd64                                   1.6.0-2ubuntu0.2                        amd64        X.509 and CMS support library
ii  liblapack3:amd64                                 3.10.0-2ubuntu1                         amd64        Library of linear algebra routines 3 - shared version
ii  liblcms2-2:amd64                                 2.12~rc1-2build2                        amd64        Little CMS 2 color management library
ii  libldap-2.5-0:amd64                              2.5.14+dfsg-0ubuntu0.22.04.2            amd64        OpenLDAP libraries
ii  libldap-common                                   2.5.14+dfsg-0ubuntu0.22.04.2            all          OpenLDAP common files for libraries
ii  libldb2:amd64                                    2:2.4.4-0ubuntu0.22.04.2                amd64        LDAP-like embedded database - shared library
ii  liblilv-0-0:amd64                                0.24.12-2                               amd64        library for simple use of LV2 plugins
ii  libllvm15:amd64                                  1:15.0.7-0ubuntu0.22.04.1               amd64        Modular compiler and toolchain technologies, runtime library
ii  liblmdb0:amd64                                   0.9.24-1build2                          amd64        Lightning Memory-Mapped Database shared library
ii  liblocale-gettext-perl                           1.07-4build3                            amd64        module using libc functions for internationalization in Perl
ii  liblqr-1-0:amd64                                 0.4.2-2.1                               amd64        converts plain array images into multi-size representation
ii  liblsan0:amd64                                   12.1.0-2ubuntu1~22.04                   amd64        LeakSanitizer -- a memory leak detector (runtime)
ii  libltdl7:amd64                                   2.4.6-15build2                          amd64        System independent dlopen wrapper for GNU libtool
ii  liblz4-1:amd64                                   1.9.3-2build2                           amd64        Fast LZ compression algorithm library - runtime
ii  liblzma-dev:amd64                                5.2.5-2ubuntu1                          amd64        XZ-format compression library - development files
ii  liblzma5:amd64                                   5.2.5-2ubuntu1                          amd64        XZ-format compression library
ii  liblzo2-2:amd64                                  2.10-2build3                            amd64        data compression library
ii  libmagic-mgc                                     1:5.41-3                                amd64        File type determination library using "magic" numbers (compiled>
ii  libmagic1:amd64                                  1:5.41-3                                amd64        Recognize the type of data in a file using "magic" numbers - li>
ii  libmagickcore-6.q16-6:amd64                      8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library -- quantum depth Q16
ii  libmagickcore-6.q16-6-extra:amd64                8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library - extra codecs (Q16)
ii  libmagickcore-6.q16hdri-6:amd64                  8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library -- quantum depth Q16HDRI
ii  libmagickcore-6.q16hdri-6-extra:amd64            8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        low-level image manipulation library - extra codecs (Q16HDRI)
ii  libmagickwand-6.q16-6:amd64                      8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation library -- quantum depth Q16
ii  libmagickwand-6.q16hdri-6:amd64                  8:6.9.11.60+dfsg-1.3ubuntu0.22.04.3     amd64        image manipulation library -- quantum depth Q16HDRI
ii  libmailutils8:amd64                              1:3.14-1                                amd64        GNU Mail abstraction library
ii  libmaxminddb0:amd64                              1.5.2-1build2                           amd64        IP geolocation database library
ii  libmd0:amd64                                     1.0.4-1build1                           amd64        message digest functions from BSD systems - shared library
ii  libmfx1:amd64                                    22.3.0-1                                amd64        Intel Media SDK -- shared library
ii  libmnl0:amd64                                    1.0.4-3build2                           amd64        minimalistic Netlink communication library
ii  libmount-dev:amd64                               2.37.2-4ubuntu3                         amd64        device mounting library - headers
ii  libmount1:amd64                                  2.37.2-4ubuntu3                         amd64        device mounting library
ii  libmp3lame0:amd64                                3.100-3build2                           amd64        MP3 encoding library
ii  libmpc3:amd64                                    1.2.1-2build1                           amd64        multiple precision complex floating-point library
ii  libmpdec3:amd64                                  2.5.1-2build2                           amd64        library for decimal floating point arithmetic (runtime library)
ii  libmpfr6:amd64                                   4.1.0-3build3                           amd64        multiple precision floating-point computation
ii  libmpg123-0:amd64                                1.29.3-1build1                          amd64        MPEG layer 1/2/3 audio decoder (shared library)
ii  libmtp-common                                    1.1.19-1build1                          all          Media Transfer Protocol (MTP) common files
ii  libmtp-runtime                                   1.1.19-1build1                          amd64        Media Transfer Protocol (MTP) runtime tools
ii  libmtp9:amd64                                    1.1.19-1build1                          amd64        Media Transfer Protocol (MTP) library
ii  libmysofa1:amd64                                 1.2.1~dfsg0-1                           amd64        library to read HRTFs stored in the AES69-2015 SOFA format
ii  libmysqlclient21:amd64                           8.0.32-0ubuntu0.22.04.2                 amd64        MySQL database client library
ii  libnautilus-extension1a:amd64                    1:42.2-0ubuntu2.1                       amd64        libraries for nautilus components - runtime version
ii  libncurses6:amd64                                6.3-2                                   amd64        shared libraries for terminal handling
ii  libncursesw6:amd64                               6.3-2                                   amd64        shared libraries for terminal handling (wide character support)
ii  libnetfilter-conntrack3:amd64                    1.0.9-1                                 amd64        Netfilter netlink-conntrack library
ii  libnetpbm10                                      2:10.0-15.4                             amd64        Graphics conversion tools shared libraries
ii  libnetplan0:amd64                                0.105-0ubuntu2~22.04.3                  amd64        YAML network configuration abstraction runtime library
ii  libnettle8:amd64                                 3.7.3-1build2                           amd64        low level cryptographic library (symmetric and one-way cryptos)
ii  libnewt0.52:amd64                                0.52.21-5ubuntu2                        amd64        Not Erik's Windowing Toolkit - text mode windowing with slang
ii  libnfnetlink0:amd64                              1.0.1-3build3                           amd64        Netfilter netlink library
ii  libnfs13:amd64                                   4.0.0-1build2                           amd64        NFS client library (shared library)
ii  libnftables1:amd64                               1.0.2-1ubuntu3                          amd64        Netfilter nftables high level userspace API library
ii  libnftnl11:amd64                                 1.2.1-1build1                           amd64        Netfilter nftables userspace API library
ii  libnghttp2-14:amd64                              1.43.0-1build3                          amd64        library implementing HTTP/2 protocol (shared library)
ii  libnl-3-200:amd64                                3.5.0-0.1                               amd64        library for dealing with netlink sockets
ii  libnl-genl-3-200:amd64                           3.5.0-0.1                               amd64        library for dealing with netlink sockets - generic netlink
ii  libnm0:amd64                                     1.36.6-0ubuntu2                         amd64        GObject-based client library for NetworkManager
ii  libnorm1:amd64                                   1.5.9+dfsg-2                            amd64        NACK-Oriented Reliable Multicast (NORM) library
ii  libnpth0:amd64                                   1.6-3build2                             amd64        replacement for GNU Pth using system threads
ii  libnsl-dev:amd64                                 1.3.0-2build2                           amd64        libnsl development files
ii  libnsl2:amd64                                    1.3.0-2build2                           amd64        Public client interface for NIS(YP) and NIS+
ii  libnspr4:amd64                                   2:4.32-3build1                          amd64        NetScape Portable Runtime Library
ii  libnss-systemd:amd64                             249.11-0ubuntu3.9                       amd64        nss module providing dynamic user and group name resolution
ii  libnss3:amd64                                    2:3.68.2-0ubuntu1.2                     amd64        Network Security Service libraries
ii  libntfs-3g89                                     1:2021.8.22-3ubuntu1.2                  amd64        read/write NTFS driver for FUSE (runtime library)
ii  libntlm0:amd64                                   1.6-4                                   amd64        NTLM authentication library
ii  libnuma1:amd64                                   2.0.14-3ubuntu2                         amd64        Libraries for controlling NUMA policy
ii  libogg0:amd64                                    1.3.5-0ubuntu3                          amd64        Ogg bitstream library
ii  libopenal-data                                   1:1.19.1-2build3                        all          Software implementation of the OpenAL audio API (data files)
ii  libopenal1:amd64                                 1:1.19.1-2build3                        amd64        Software implementation of the OpenAL audio API (shared library)
ii  libopenexr25:amd64                               2.5.7-1                                 amd64        runtime files for the OpenEXR image library
ii  libopenjp2-7:amd64                               2.4.0-6                                 amd64        JPEG 2000 image compression/decompression library
ii  libopenmpt0:amd64                                0.6.1-1                                 amd64        module music library based on OpenMPT -- shared library
ii  libopus0:amd64                                   1.3.1-0.1build2                         amd64        Opus codec runtime library
ii  liborc-0.4-0:amd64                               1:0.4.32-2                              amd64        Library of Optimized Inner Loops Runtime Compiler
ii  liborc-0.4-dev:amd64                             1:0.4.32-2                              amd64        Library of Optimized Inner Loops Runtime Compiler (development >
ii  liborc-0.4-dev-bin                               1:0.4.32-2                              amd64        Library of Optimized Inner Loops Runtime Compiler (development >
ii  libostree-1-1:amd64                              2022.2-3                                amd64        content-addressed filesystem for operating system binaries (lib>
ii  libp11-kit0:amd64                                0.24.0-6build1                          amd64        library for loading and coordinating access to PKCS#11 modules >
ii  libpackagekit-glib2-18:amd64                     1.2.5-2ubuntu2                          amd64        Library for accessing PackageKit using GLib
ii  libpam-cap:amd64                                 1:2.44-1build3                          amd64        POSIX 1003.1e capabilities (PAM module)
ii  libpam-gnome-keyring:amd64                       40.0-3ubuntu3                           amd64        PAM module to unlock the GNOME keyring upon login
ii  libpam-modules:amd64                             1.4.0-11ubuntu2.3                       amd64        Pluggable Authentication Modules for PAM
ii  libpam-modules-bin                               1.4.0-11ubuntu2.3                       amd64        Pluggable Authentication Modules for PAM - helper binaries
ii  libpam-runtime                                   1.4.0-11ubuntu2.3                       all          Runtime support for the PAM library
ii  libpam-systemd:amd64                             249.11-0ubuntu3.9                       amd64        system and service manager - PAM module
ii  libpam0g:amd64                                   1.4.0-11ubuntu2.3                       amd64        Pluggable Authentication Modules library
ii  libpango-1.0-0:amd64                             1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpangocairo-1.0-0:amd64                        1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpangoft2-1.0-0:amd64                          1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpangoxft-1.0-0:amd64                          1.50.6+ds-2ubuntu1                      amd64        Layout and rendering of internationalized text
ii  libpaper-utils                                   1.1.28build2                            amd64        library for handling paper characteristics (utilities)
ii  libpaper1:amd64                                  1.1.28build2                            amd64        library for handling paper characteristics
ii  libparted-fs-resize0:amd64                       3.4-2build1                             amd64        disk partition manipulator - shared FS resizing library
ii  libparted2:amd64                                 3.4-2build1                             amd64        disk partition manipulator - shared library
ii  libpcap0.8:amd64                                 1.10.1-4build1                          amd64        system interface for user-level packet capture
ii  libpci3:amd64                                    1:3.7.0-6                               amd64        PCI utilities (shared library)
ii  libpciaccess-dev:amd64                           0.16-3                                  amd64        Generic PCI access library for X - development files
ii  libpciaccess0:amd64                              0.16-3                                  amd64        Generic PCI access library for X
ii  libpcre16-3:amd64                                2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - 16 bit runti>
ii  libpcre2-16-0:amd64                              10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - 16 bit runtime>
ii  libpcre2-32-0:amd64                              10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - 32 bit runtime>
ii  libpcre2-8-0:amd64                               10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library- 8 bit runtime f>
ii  libpcre2-dev:amd64                               10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - development fi>
ii  libpcre2-posix3:amd64                            10.39-3ubuntu0.1                        amd64        New Perl Compatible Regular Expression Library - posix-compatib>
ii  libpcre3:amd64                                   2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - runtime files
ii  libpcre3-dev:amd64                               2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - development >
ii  libpcre32-3:amd64                                2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - 32 bit runti>
ii  libpcrecpp0v5:amd64                              2:8.39-13ubuntu0.22.04.1                amd64        Old Perl 5 Compatible Regular Expression Library - C++ runtime >
ii  libperl5.34:amd64                                5.34.0-3ubuntu1.1                       amd64        shared Perl library
ii  libpgm-5.3-0:amd64                               5.3.128~dfsg-2                          amd64        OpenPGM shared library
ii  libpipeline1:amd64                               1.5.5-1                                 amd64        Unix process pipeline manipulation library
ii  libpixman-1-0:amd64                              0.40.0-1ubuntu0.22.04.1                 amd64        pixel-manipulation library for X and cairo
ii  libpixman-1-dev:amd64                            0.40.0-1ubuntu0.22.04.1                 amd64        pixel-manipulation library for X and cairo (development files)
ii  libplist3:amd64                                  2.2.0-6build2                           amd64        Library for handling Apple binary and XML property lists
ii  libplymouth5:amd64                               0.9.5+git20211018-1ubuntu3              amd64        graphical boot animation and logger - shared libraries
ii  libpng-dev:amd64                                 1.6.37-3build5                          amd64        PNG library - development (version 1.6)
ii  libpng-tools                                     1.6.37-3build5                          amd64        PNG library - tools (version 1.6)
ii  libpng16-16:amd64                                1.6.37-3build5                          amd64        PNG library - runtime (version 1.6)
ii  libpocketsphinx3:amd64                           0.8.0+real5prealpha+1-14ubuntu1         amd64        Speech recognition tool - front-end library
ii  libpolkit-agent-1-0:amd64                        0.105-33                                amd64        PolicyKit Authentication Agent API
ii  libpolkit-gobject-1-0:amd64                      0.105-33                                amd64        PolicyKit Authorization API
ii  libpoppler-glib8:amd64                           22.02.0-2ubuntu0.1                      amd64        PDF rendering library (GLib-based shared library)
ii  libpoppler118:amd64                              22.02.0-2ubuntu0.1                      amd64        PDF rendering library
ii  libpopt0:amd64                                   1.18-3build1                            amd64        lib for parsing cmdline parameters
ii  libportaudio2:amd64                              19.6.0-1.1                              amd64        Portable audio I/O - shared library
ii  libportaudiocpp0:amd64                           19.6.0-1.1                              amd64        Portable audio I/O C++ bindings - shared library
ii  libpostproc55:amd64                              7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for post processing - runtime files
ii  libpq5:amd64                                     14.7-0ubuntu0.22.04.1                   amd64        PostgreSQL C client library
ii  libprocps8:amd64                                 2:3.3.17-6ubuntu2                       amd64        library for accessing process information from /proc
ii  libproxy1v5:amd64                                0.4.17-2                                amd64        automatic proxy configuration management library (shared)
ii  libpsl5:amd64                                    0.21.0-1.2build2                        amd64        Library for Public Suffix List (shared libraries)
ii  libpthread-stubs0-dev:amd64                      0.4-1build2                             amd64        pthread stubs not provided by native libc, development files
ii  libpulse0:amd64                                  1:15.99.1+dfsg1-1ubuntu2.1              amd64        PulseAudio client libraries
ii  libpython3-dev:amd64                             3.10.6-1~22.04                          amd64        header files and a static library for Python (default)
ii  libpython3-stdlib:amd64                          3.10.6-1~22.04                          amd64        interactive high-level object-oriented language (default python>
ii  libpython3.10:amd64                              3.10.6-1~22.04.2ubuntu1                 amd64        Shared Python runtime library (version 3.10)
ii  libpython3.10-dev:amd64                          3.10.6-1~22.04.2ubuntu1                 amd64        Header files and a static library for Python (v3.10)
ii  libpython3.10-minimal:amd64                      3.10.6-1~22.04.2ubuntu1                 amd64        Minimal subset of the Python language (version 3.10)
ii  libpython3.10-stdlib:amd64                       3.10.6-1~22.04.2ubuntu1                 amd64        Interactive high-level object-oriented language (standard libra>
ii  libquadmath0:amd64                               12.1.0-2ubuntu1~22.04                   amd64        GCC Quad-Precision Math Library
ii  librabbitmq4:amd64                               0.10.0-1ubuntu2                         amd64        AMQP client library written in C
ii  libraw1394-11:amd64                              2.1.2-2build2                           amd64        library for direct access to IEEE 1394 bus (aka FireWire)
ii  libreadline8:amd64                               8.1.2-1                                 amd64        GNU readline and history libraries, run-time libraries
ii  librsvg2-2:amd64                                 2.52.5+dfsg-3                           amd64        SAX-based renderer library for SVG files (runtime)
ii  librsvg2-common:amd64                            2.52.5+dfsg-3                           amd64        SAX-based renderer library for SVG files (extra runtime)
ii  librtmp1:amd64                                   2.4+20151223.gitfa8646d.1-2build4       amd64        toolkit for RTMP streams (shared library)
ii  librubberband2:amd64                             2.0.0-2                                 amd64        audio time-stretching and pitch-shifting library
ii  libsamplerate0:amd64                             0.2.2-1build1                           amd64        Audio sample rate conversion library
ii  libsasl2-2:amd64                                 2.1.27+dfsg2-3ubuntu1.2                 amd64        Cyrus SASL - authentication abstraction library
ii  libsasl2-modules:amd64                           2.1.27+dfsg2-3ubuntu1.2                 amd64        Cyrus SASL - pluggable authentication modules
ii  libsasl2-modules-db:amd64                        2.1.27+dfsg2-3ubuntu1.2                 amd64        Cyrus SASL - pluggable authentication modules (DB)
ii  libsdl2-2.0-0:amd64                              2.0.20+dfsg-2ubuntu1.22.04.1            amd64        Simple DirectMedia Layer
ii  libseccomp2:amd64                                2.5.3-2ubuntu2                          amd64        high level interface to Linux seccomp filter
ii  libsecret-1-0:amd64                              0.20.5-2                                amd64        Secret store
ii  libsecret-common                                 0.20.5-2                                all          Secret store (common files)
ii  libselinux1:amd64                                3.3-1build2                             amd64        SELinux runtime shared libraries
ii  libselinux1-dev:amd64                            3.3-1build2                             amd64        SELinux development headers
ii  libsemanage-common                               3.3-1build2                             all          Common files for SELinux policy management libraries
ii  libsemanage2:amd64                               3.3-1build2                             amd64        SELinux policy management library
ii  libsensors-config                                1:3.6.0-7ubuntu1                        all          lm-sensors configuration files
ii  libsensors5:amd64                                1:3.6.0-7ubuntu1                        amd64        library to read temperature/voltage/fan sensors
ii  libsepol-dev:amd64                               3.3-1build1                             amd64        SELinux binary policy manipulation library and development files
ii  libsepol2:amd64                                  3.3-1build1                             amd64        SELinux library for manipulating binary security policies
ii  libserd-0-0:amd64                                0.30.10-2                               amd64        lightweight RDF syntax library
ii  libshine3:amd64                                  3.1.1-2                                 amd64        Fixed-point MP3 encoding library - runtime files
ii  libshout3:amd64                                  2.4.5-1build3                           amd64        MP3/Ogg Vorbis broadcast streaming library
ii  libsigsegv2:amd64                                2.13-1ubuntu3                           amd64        Library for handling page faults in a portable way
ii  libslang2:amd64                                  2.3.2-5build4                           amd64        S-Lang programming library - runtime version
ii  libslirp0:amd64                                  4.6.1-1build1                           amd64        General purpose TCP-IP emulator library
ii  libsm-dev:amd64                                  2:1.2.3-1build2                         amd64        X11 Session Management library (development headers)
ii  libsm6:amd64                                     2:1.2.3-1build2                         amd64        X11 Session Management library
ii  libsmartcols1:amd64                              2.37.2-4ubuntu3                         amd64        smart column output alignment library
ii  libsmbclient:amd64                               2:4.15.13+dfsg-0ubuntu1.1               amd64        shared library for communication with SMB/CIFS servers
ii  libsnappy1v5:amd64                               1.1.8-1build3                           amd64        fast compression/decompression library
ii  libsndfile1:amd64                                1.0.31-2build1                          amd64        Library for reading/writing audio files
ii  libsndio7.0:amd64                                1.8.1-1.1                               amd64        Small audio and MIDI framework from OpenBSD, runtime libraries
ii  libsodium23:amd64                                1.0.18-1build2                          amd64        Network communication, cryptography and signaturing library
ii  libsord-0-0:amd64                                0.16.8-2                                amd64        library for storing RDF data in memory
ii  libsoup2.4-1:amd64                               2.74.2-3                                amd64        HTTP library implementation in C -- Shared library
ii  libsoup2.4-common                                2.74.2-3                                all          HTTP library implementation in C -- Common files
ii  libsoxr0:amd64                                   0.1.3-4build2                           amd64        High quality 1D sample-rate conversion library
ii  libspeex1:amd64                                  1.2~rc1.2-1.1ubuntu3                    amd64        The Speex codec runtime library
ii  libsphinxbase3:amd64                             0.8+5prealpha+1-13build1                amd64        Speech recognition tool - shared library
ii  libsqlite3-0:amd64                               3.37.2-2ubuntu0.1                       amd64        SQLite 3 shared library
ii  libsratom-0-0:amd64                              0.6.8-1                                 amd64        library for serialising LV2 atoms to/from Turtle
ii  libsrt1.4-gnutls:amd64                           1.4.4-4                                 amd64        Secure Reliable Transport UDP streaming library (GnuTLS flavour)
ii  libss2:amd64                                     1.46.5-2ubuntu1.1                       amd64        command-line interface parsing library
ii  libssh-4:amd64                                   0.9.6-2build1                           amd64        tiny C SSH library (OpenSSL flavor)
ii  libssh-gcrypt-4:amd64                            0.9.6-2build1                           amd64        tiny C SSH library (gcrypt flavor)
ii  libssl3:amd64                                    3.0.2-0ubuntu1.9                        amd64        Secure Sockets Layer toolkit - shared libraries
ii  libstdc++-11-dev:amd64                           11.3.0-1ubuntu1~22.04                   amd64        GNU Standard C++ Library v3 (development files)
ii  libstdc++6:amd64                                 12.1.0-2ubuntu1~22.04                   amd64        GNU Standard C++ Library v3
ii  libstemmer0d:amd64                               2.2.0-1build1                           amd64        Snowball stemming algorithms for use in Information Retrieval
ii  libswresample3:amd64                             7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for audio resampling, rematrixing etc. - runtime>
ii  libswscale5:amd64                                7:4.4.2-0ubuntu0.22.04.1                amd64        FFmpeg library for image scaling and various conversions - runt>
ii  libsystemd0:amd64                                249.11-0ubuntu3.9                       amd64        systemd utility library
ii  libtag1v5:amd64                                  1.11.1+dfsg.1-3ubuntu3                  amd64        audio meta-data library
ii  libtag1v5-vanilla:amd64                          1.11.1+dfsg.1-3ubuntu3                  amd64        audio meta-data library - vanilla flavour
ii  libtalloc2:amd64                                 2.3.3-2build1                           amd64        hierarchical pool based memory allocator
ii  libtasn1-6:amd64                                 4.18.0-4build1                          amd64        Manage ASN.1 structures (runtime)
ii  libtdb1:amd64                                    1.4.5-2build1                           amd64        Trivial Database - shared library
ii  libtevent0:amd64                                 0.11.0-1build1                          amd64        talloc-based event loop library - shared library
ii  libtext-charwidth-perl                           0.04-10build3                           amd64        get display widths of characters on the terminal
ii  libtext-iconv-perl                               1.7-7build3                             amd64        module to convert between character sets in Perl
ii  libtext-wrapi18n-perl                            0.06-9                                  all          internationalized substitute of Text::Wrap
ii  libthai-data                                     0.1.29-1build1                          all          Data files for Thai language support library
ii  libthai0:amd64                                   0.1.29-1build1                          amd64        Thai language support library
ii  libtheora0:amd64                                 1.1.1+dfsg.1-15ubuntu4                  amd64        Theora Video Compression Codec
ii  libtiff5:amd64                                   4.3.0-6ubuntu0.4                        amd64        Tag Image File Format (TIFF) library
ii  libtinfo6:amd64                                  6.3-2                                   amd64        shared low-level terminfo library for terminal handling
ii  libtirpc-common                                  1.3.2-2ubuntu0.1                        all          transport-independent RPC library - common files
ii  libtirpc-dev:amd64                               1.3.2-2ubuntu0.1                        amd64        transport-independent RPC library - development files
ii  libtirpc3:amd64                                  1.3.2-2ubuntu0.1                        amd64        transport-independent RPC library
ii  libtotem-plparser-common                         3.26.6-1build1                          all          Totem Playlist Parser library - common files
ii  libtotem-plparser18:amd64                        3.26.6-1build1                          amd64        Totem Playlist Parser library - runtime files
ii  libtracker-sparql-3.0-0:amd64                    3.3.0-1                                 amd64        metadata database, indexer and search tool - library
ii  libtsan0:amd64                                   11.3.0-1ubuntu1~22.04                   amd64        ThreadSanitizer -- a Valgrind-based detector of data races (run>
ii  libtwolame0:amd64                                0.4.0-2build2                           amd64        MPEG Audio Layer 2 encoding library
ii  libubsan1:amd64                                  12.1.0-2ubuntu1~22.04                   amd64        UBSan -- undefined behaviour sanitizer (runtime)
ii  libuchardet0:amd64                               0.0.7-1build2                           amd64        universal charset detection library - shared library
ii  libudev-dev:amd64                                249.11-0ubuntu3.9                       amd64        libudev development files
ii  libudev1:amd64                                   249.11-0ubuntu3.9                       amd64        libudev shared library
ii  libudfread0:amd64                                1.1.2-1                                 amd64        UDF reader library
ii  libudisks2-0:amd64                               2.9.4-1ubuntu2                          amd64        GObject based library to access udisks2
ii  libunistring2:amd64                              1.0-1                                   amd64        Unicode string library for C
ii  libunity-protocol-private0:amd64                 7.1.4+19.04.20190319-6build1            amd64        binding to get places into the launcher - private library
ii  libunity-scopes-json-def-desktop                 7.1.4+19.04.20190319-6build1            all          binding to get places into the launcher - desktop def file
ii  libunity9:amd64                                  7.1.4+19.04.20190319-6build1            amd64        binding to get places into the launcher - shared library
ii  libunwind-dev:amd64                              1.3.2-2build2                           amd64        library to determine the call-chain of a program - development
ii  libunwind8:amd64                                 1.3.2-2build2                           amd64        library to determine the call-chain of a program - runtime
ii  libupower-glib3:amd64                            0.99.17-1                               amd64        abstraction for power management - shared library
ii  libusb-1.0-0:amd64                               2:1.0.25-1ubuntu2                       amd64        userspace USB programming library
ii  libusbmuxd6:amd64                                2.0.2-3build2                           amd64        USB multiplexor daemon for iPhone and iPod Touch devices - libr>
ii  libutempter0:amd64                               1.2.1-2build2                           amd64        privileged helper for utmp/wtmp updates (runtime)
ii  libuuid1:amd64                                   2.37.2-4ubuntu3                         amd64        Universally Unique ID library
ii  libuv1:amd64                                     1.43.0-1                                amd64        asynchronous event notification library - runtime library
ii  libv4l-0:amd64                                   1.22.1-2build1                          amd64        Collection of video4linux support libraries
ii  libv4lconvert0:amd64                             1.22.1-2build1                          amd64        Video4linux frame format conversion library
ii  libva-drm2:amd64                                 2.14.0-1                                amd64        Video Acceleration (VA) API for Linux -- DRM runtime
ii  libva-x11-2:amd64                                2.14.0-1                                amd64        Video Acceleration (VA) API for Linux -- X11 runtime
ii  libva2:amd64                                     2.14.0-1                                amd64        Video Acceleration (VA) API for Linux -- runtime
ii  libvdpau1:amd64                                  1.4-3build2                             amd64        Video Decode and Presentation API for Unix (libraries)
ii  libvidstab1.1:amd64                              1.1.0-2                                 amd64        video stabilization library (shared library)
ii  libvisual-0.4-0:amd64                            0.4.0-17build2                          amd64        audio visualization framework
ii  libvolume-key1                                   0.3.12-3.1build3                        amd64        Library for manipulating storage encryption keys and passphrases
ii  libvorbis0a:amd64                                1.3.7-1build2                           amd64        decoder library for Vorbis General Audio Compression Codec
ii  libvorbisenc2:amd64                              1.3.7-1build2                           amd64        encoder library for Vorbis General Audio Compression Codec
ii  libvorbisfile3:amd64                             1.3.7-1build2                           amd64        high-level API for Vorbis General Audio Compression Codec
ii  libvpx7:amd64                                    1.11.0-2ubuntu2                         amd64        VP8 and VP9 video codec (shared library)
ii  libwavpack1:amd64                                5.4.0-1build2                           amd64        audio codec (lossy and lossless) - library
ii  libwayland-bin                                   1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - binary utilities
ii  libwayland-client0:amd64                         1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - client library
ii  libwayland-cursor0:amd64                         1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - cursor library
ii  libwayland-dev:amd64                             1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - development files
ii  libwayland-egl1:amd64                            1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - EGL library
ii  libwayland-server0:amd64                         1.20.0-1ubuntu0.1                       amd64        wayland compositor infrastructure - server library
ii  libwbclient0:amd64                               2:4.15.13+dfsg-0ubuntu1.1               amd64        Samba winbind client library
ii  libwebp7:amd64                                   1.2.2-2                                 amd64        Lossy compression of digital photographic images
ii  libwebpdemux2:amd64                              1.2.2-2                                 amd64        Lossy compression of digital photographic images.
ii  libwebpmux3:amd64                                1.2.2-2                                 amd64        Lossy compression of digital photographic images
ii  libwmflite-0.2-7:amd64                           0.2.12-5ubuntu1                         amd64        Windows metafile conversion lite library
ii  libx11-6:amd64                                   2:1.7.5-1                               amd64        X11 client-side library
ii  libx11-data                                      2:1.7.5-1                               all          X11 client-side library
ii  libx11-dev:amd64                                 2:1.7.5-1                               amd64        X11 client-side library (development headers)
ii  libx11-xcb-dev:amd64                             2:1.7.5-1                               amd64        Xlib/XCB interface library (development headers)
ii  libx11-xcb1:amd64                                2:1.7.5-1                               amd64        Xlib/XCB interface library
ii  libx264-163:amd64                                2:0.163.3060+git5db6aa6-2build1         amd64        x264 video coding library
ii  libx265-199:amd64                                3.5-2                                   amd64        H.265/HEVC video stream encoder (shared library)
ii  libx32asan6                                      11.3.0-1ubuntu1~22.04                   amd64        AddressSanitizer -- a fast memory error detector (x32)
ii  libx32atomic1                                    12.1.0-2ubuntu1~22.04                   amd64        support library providing __atomic built-in functions (x32)
ii  libx32gcc-11-dev                                 11.3.0-1ubuntu1~22.04                   amd64        GCC support library (x32 development files)
ii  libx32gcc-s1                                     12.1.0-2ubuntu1~22.04                   amd64        GCC support library (x32)
ii  libx32gomp1                                      12.1.0-2ubuntu1~22.04                   amd64        GCC OpenMP (GOMP) support library (x32)
ii  libx32itm1                                       12.1.0-2ubuntu1~22.04                   amd64        GNU Transactional Memory Library (x32)
ii  libx32quadmath0                                  12.1.0-2ubuntu1~22.04                   amd64        GCC Quad-Precision Math Library (x32)
ii  libx32stdc++6                                    12.1.0-2ubuntu1~22.04                   amd64        GNU Standard C++ Library v3 (x32)
ii  libx32ubsan1                                     12.1.0-2ubuntu1~22.04                   amd64        UBSan -- undefined behaviour sanitizer (x32)
ii  libxau-dev:amd64                                 1:1.0.9-1build5                         amd64        X11 authorisation library (development headers)
ii  libxau6:amd64                                    1:1.0.9-1build5                         amd64        X11 authorisation library
ii  libxcb-dri2-0:amd64                              1.14-3ubuntu3                           amd64        X C Binding, dri2 extension
ii  libxcb-dri3-0:amd64                              1.14-3ubuntu3                           amd64        X C Binding, dri3 extension
ii  libxcb-glx0:amd64                                1.14-3ubuntu3                           amd64        X C Binding, glx extension
ii  libxcb-present0:amd64                            1.14-3ubuntu3                           amd64        X C Binding, present extension
ii  libxcb-render0:amd64                             1.14-3ubuntu3                           amd64        X C Binding, render extension
ii  libxcb-render0-dev:amd64                         1.14-3ubuntu3                           amd64        X C Binding, render extension, development files
ii  libxcb-shape0:amd64                              1.14-3ubuntu3                           amd64        X C Binding, shape extension
ii  libxcb-shm0:amd64                                1.14-3ubuntu3                           amd64        X C Binding, shm extension
ii  libxcb-shm0-dev:amd64                            1.14-3ubuntu3                           amd64        X C Binding, shm extension, development files
ii  libxcb-sync1:amd64                               1.14-3ubuntu3                           amd64        X C Binding, sync extension
ii  libxcb-xfixes0:amd64                             1.14-3ubuntu3                           amd64        X C Binding, xfixes extension
ii  libxcb1:amd64                                    1.14-3ubuntu3                           amd64        X C Binding
ii  libxcb1-dev:amd64                                1.14-3ubuntu3                           amd64        X C Binding, development files
ii  libxcomposite1:amd64                             1:0.4.5-1build2                         amd64        X11 Composite extension library
ii  libxcursor1:amd64                                1:1.2.0-2build4                         amd64        X cursor management library
ii  libxdamage1:amd64                                1:1.1.5-2build2                         amd64        X11 damaged region extension library
ii  libxdmcp-dev:amd64                               1:1.1.3-0ubuntu5                        amd64        X11 authorisation library (development headers)
ii  libxdmcp6:amd64                                  1:1.1.3-0ubuntu5                        amd64        X11 Display Manager Control Protocol library
ii  libxext-dev:amd64                                2:1.3.4-1build1                         amd64        X11 miscellaneous extensions library (development headers)
ii  libxext6:amd64                                   2:1.3.4-1build1                         amd64        X11 miscellaneous extension library
ii  libxfixes3:amd64                                 1:6.0.0-1                               amd64        X11 miscellaneous 'fixes' extension library
ii  libxft2:amd64                                    2.3.4-1                                 amd64        FreeType-based font drawing library for X
ii  libxi6:amd64                                     2:1.8-1build1                           amd64        X11 Input extension library
ii  libxinerama1:amd64                               2:1.1.4-3                               amd64        X11 Xinerama extension library
ii  libxkbcommon0:amd64                              1.4.0-1                                 amd64        library interface to the XKB compiler - shared library
ii  libxkbregistry0:amd64                            1.4.0-1                                 amd64        library to query available RMLVO
ii  libxml2:amd64                                    2.9.13+dfsg-1ubuntu0.3                  amd64        GNOME XML library
ii  libxmlb2:amd64                                   0.3.6-2build1                           amd64        Binary XML library
ii  libxmuu1:amd64                                   2:1.1.3-3                               amd64        X11 miscellaneous micro-utility library
ii  libxpm4:amd64                                    1:3.5.12-1ubuntu0.22.04.1               amd64        X11 pixmap library
ii  libxrandr2:amd64                                 2:1.5.2-1build1                         amd64        X11 RandR extension library
ii  libxrender-dev:amd64                             1:0.9.10-1build4                        amd64        X Rendering Extension client library (development files)
ii  libxrender1:amd64                                1:0.9.10-1build4                        amd64        X Rendering Extension client library
ii  libxshmfence1:amd64                              1.3-1build4                             amd64        X shared memory fences - shared library
ii  libxss1:amd64                                    1:1.2.3-1build2                         amd64        X11 Screen Saver extension library
ii  libxtables12:amd64                               1.8.7-1ubuntu5                          amd64        netfilter xtables library
ii  libxtst6:amd64                                   2:1.2.3-1build4                         amd64        X11 Testing -- Record extension library
ii  libxv1:amd64                                     2:1.0.11-1build2                        amd64        X11 Video extension library
ii  libxvidcore4:amd64                               2:1.3.7-1                               amd64        Open source MPEG-4 video codec (library)
ii  libxxf86vm1:amd64                                1:1.1.4-1build3                         amd64        X11 XFree86 video mode extension library
ii  libxxhash0:amd64                                 0.8.1-1                                 amd64        shared library for xxhash
ii  libyaml-0-2:amd64                                0.2.2-1build2                           amd64        Fast YAML 1.1 parser and emitter library
ii  libzimg2:amd64                                   3.0.3+ds1-1                             amd64        scaling, colorspace, depth conversion library (shared library)
ii  libzmq5:amd64                                    4.3.4-2                                 amd64        lightweight messaging kernel (shared library)
ii  libzstd1:amd64                                   1.4.8+dfsg-3build1                      amd64        fast lossless compression algorithm
ii  libzvbi-common                                   0.2.35-19                               all          Vertical Blanking Interval decoder (VBI) - common files
ii  libzvbi0:amd64                                   0.2.35-19                               amd64        Vertical Blanking Interval decoder (VBI) - runtime files
ii  linux-libc-dev:amd64                             5.15.0-71.78                            amd64        Linux Kernel Headers for development
ii  locales                                          2.35-0ubuntu3.1                         all          GNU C Library: National Language (locale) data [support]
ii  login                                            1:4.8.1-2ubuntu2.1                      amd64        system login tools
ii  logrotate                                        3.19.0-1ubuntu1.1                       amd64        Log rotation utility
ii  logsave                                          1.46.5-2ubuntu1.1                       amd64        save the output of a command in a log file
ii  lsb-base                                         11.1.0ubuntu4                           all          Linux Standard Base init script functionality
ii  lsb-release                                      11.1.0ubuntu4                           all          Linux Standard Base version reporting utility
ii  lshw                                             02.19.git.2021.06.19.996aaad9c7-2build1 amd64        information about hardware configuration
ii  lsof                                             4.93.2+dfsg-1.1build2                   amd64        utility to list open files
ii  lto-disabled-list                                24                                      all          list of packages not to build with LTO
ii  m4                                               1.4.18-5ubuntu2                         amd64        macro processing language
ii  mailutils                                        1:3.14-1                                amd64        GNU mailutils utilities for handling mail
ii  mailutils-common                                 1:3.14-1                                all          common files for GNU mailutils
ii  make                                             4.3-4.1build1                           amd64        utility for directing compilation
ii  man-db                                           2.10.2-1                                amd64        tools for reading manual pages
ii  manpages                                         5.10-1ubuntu1                           all          Manual pages about using a GNU/Linux system
ii  manpages-dev                                     5.10-1ubuntu1                           all          Manual pages about using GNU/Linux for development
ii  mawk                                             1.3.4.20200120-3                        amd64        Pattern scanning and text processing language
ii  media-types                                      7.0.0                                   all          List of standard media types and their usual file extension
ii  mesa-va-drivers:amd64                            22.2.5-0ubuntu0.1~22.04.1               amd64        Mesa VA-API video acceleration drivers
ii  mesa-vdpau-drivers:amd64                         22.2.5-0ubuntu0.1~22.04.1               amd64        Mesa VDPAU video acceleration drivers
ii  motd-news-config                                 12ubuntu4.3                             all          Configuration for motd-news shipped in base-files
ii  mount                                            2.37.2-4ubuntu3                         amd64        tools for mounting and manipulating filesystems
ii  mtr-tiny                                         0.95-1                                  amd64        Full screen ncurses traceroute tool
ii  mysql-common                                     5.8+1.0.8                               all          MySQL database common files, e.g. /etc/mysql/my.cnf
ii  nano                                             6.2-1                                   amd64        small, friendly text editor inspired by Pico
ii  nautilus                                         1:42.2-0ubuntu2.1                       amd64        file manager and graphical shell for GNOME
ii  nautilus-data                                    1:42.2-0ubuntu2.1                       all          data files for nautilus
ii  ncurses-base                                     6.3-2                                   all          basic terminal type definitions
ii  ncurses-bin                                      6.3-2                                   amd64        terminal-related programs and man pages
ii  netbase                                          6.3                                     all          Basic TCP/IP networking system
ii  netcat-openbsd                                   1.218-4ubuntu1                          amd64        TCP/IP swiss army knife
ii  netpbm                                           2:10.0-15.4                             amd64        Graphics conversion tools between image formats
ii  netplan.io                                       0.105-0ubuntu2~22.04.3                  amd64        YAML network configuration abstraction for various backends
ii  networkd-dispatcher                              2.1-2ubuntu0.22.04.2                    all          Dispatcher service for systemd-networkd connection status chang>
ii  nftables                                         1.0.2-1ubuntu3                          amd64        Program to control packet filtering rules by Netfilter project
ii  ntfs-3g                                          1:2021.8.22-3ubuntu1.2                  amd64        read/write NTFS driver for FUSE
ii  ocl-icd-libopencl1:amd64                         2.2.14-3                                amd64        Generic OpenCL ICD Loader
ii  openssh-client                                   1:8.9p1-3ubuntu0.1                      amd64        secure shell (SSH) client, for secure access to remote machines
ii  openssl                                          3.0.2-0ubuntu1.9                        amd64        Secure Sockets Layer toolkit - cryptographic utility
ii  p11-kit                                          0.24.0-6build1                          amd64        p11-glue utilities
ii  p11-kit-modules:amd64                            0.24.0-6build1                          amd64        p11-glue proxy and trust modules
ii  packagekit                                       1.2.5-2ubuntu2                          amd64        Provides a package management service
ii  packagekit-tools                                 1.2.5-2ubuntu2                          amd64        Provides PackageKit command-line tools
ii  parted                                           3.4-2build1                             amd64        disk partition manipulator
ii  passwd                                           1:4.8.1-2ubuntu2.1                      amd64        change and administer password and group data
ii  pastebinit                                       1.5.1-1ubuntu1                          all          command-line pastebin client
ii  patch                                            2.7.6-7build2                           amd64        Apply a diff file to an original
ii  pci.ids                                          0.0~2022.01.22-1                        all          PCI ID Repository
ii  pciutils                                         1:3.7.0-6                               amd64        PCI utilities
ii  perl                                             5.34.0-3ubuntu1.1                       amd64        Larry Wall's Practical Extraction and Report Language
ii  perl-base                                        5.34.0-3ubuntu1.1                       amd64        minimal Perl system
ii  perl-modules-5.34                                5.34.0-3ubuntu1.1                       all          Core Perl modules
ii  pigz                                             2.6-1                                   amd64        Parallel Implementation of GZip
ii  pinentry-curses                                  1.1.1-1build2                           amd64        curses-based PIN or pass-phrase entry dialog for GnuPG
ii  pinentry-gnome3                                  1.1.1-1build2                           amd64        GNOME 3 PIN or pass-phrase entry dialog for GnuPG
ii  pkexec                                           0.105-33                                amd64        run commands as another user with polkit authorization
ii  pkg-config                                       0.29.2-1ubuntu3                         amd64        manage compile and link flags for libraries
ii  plymouth                                         0.9.5+git20211018-1ubuntu3              amd64        boot animation, logger and I/O multiplexer
ii  plymouth-theme-ubuntu-text                       0.9.5+git20211018-1ubuntu3              amd64        boot animation, logger and I/O multiplexer - ubuntu text theme
ii  pocketsphinx-en-us                               0.8.0+real5prealpha+1-14ubuntu1         all          Speech recognition tool - US English language model
ii  podman                                           3.4.4+ds1-1ubuntu1                      amd64        engine to run OCI-based containers in Pods
ii  policykit-1                                      0.105-33                                amd64        transitional package for polkitd and pkexec
ii  polkitd                                          0.105-33                                amd64        framework for managing administrative policies and privileges
ii  poppler-data                                     0.4.11-1                                all          encoding data for the poppler PDF rendering library
ii  portaudio19-dev:amd64                            19.6.0-1.1                              amd64        Portable audio I/O - development files
iF  postfix                                          3.6.4-1ubuntu1.1                        amd64        High-performance mail transport agent
ii  powermgmt-base                                   1.36                                    all          common utils for power management
ii  procps                                           2:3.3.17-6ubuntu2                       amd64        /proc file system utilities
ii  psmisc                                           23.4-2build3                            amd64        utilities that use the proc file system
ii  publicsuffix                                     20211207.1025-1                         all          accurate, machine-readable list of domain name suffixes
ii  python-apt-common                                2.4.0ubuntu1                            all          Python interface to libapt-pkg (locales)
ii  python3                                          3.10.6-1~22.04                          amd64        interactive high-level object-oriented language (default python>
ii  python3-apport                                   2.20.11-0ubuntu82.4                     all          Python 3 library for Apport crash report handling
ii  python3-apt                                      2.4.0ubuntu1                            amd64        Python 3 interface to libapt-pkg
ii  python3-attr                                     21.2.0-1                                all          Attributes without boilerplate (Python 3)
ii  python3-blinker                                  1.4+dfsg1-0.4                           all          fast, simple object-to-object and broadcast signaling library
ii  python3-certifi                                  2020.6.20-1                             all          root certificates for validating SSL certs and verifying TLS ho>
ii  python3-cffi-backend:amd64                       1.15.0-1build2                          amd64        Foreign Function Interface for Python 3 calling C code - runtime
ii  python3-chardet                                  4.0.0-1                                 all          universal character encoding detector for Python3
ii  python3-commandnotfound                          22.04.0                                 all          Python 3 bindings for command-not-found.
ii  python3-cryptography                             3.4.8-1ubuntu2                          amd64        Python library exposing cryptographic recipes and primitives (P>
ii  python3-dbus                                     1.2.18-3build1                          amd64        simple interprocess messaging system (Python 3 interface)
ii  python3-dev                                      3.10.6-1~22.04                          amd64        header files and a static library for Python (default)
ii  python3-distro                                   1.7.0-1                                 all          Linux OS platform information API
ii  python3-distro-info                              1.1build1                               all          information about distributions' releases (Python 3 module)
ii  python3-distupgrade                              1:22.04.16                              all          manage release upgrades
ii  python3-distutils                                3.10.6-1~22.04                          all          distutils package for Python 3.x
ii  python3-docker                                   5.0.3-1                                 all          Python 3 wrapper to access docker.io's control socket
ii  python3-dockerpty                                0.4.1-2                                 all          Pseudo-tty handler for docker Python client (Python 3.x)
ii  python3-docopt                                   0.6.2-4                                 all          command-line interface description language (Python3)
ii  python3-dotenv                                   0.19.2-1                                all          Get and set values in the .env file in local and production ser>
ii  python3-gdbm:amd64                               3.10.6-1~22.04                          amd64        GNU dbm database support for Python 3.x
ii  python3-gi                                       3.42.1-0ubuntu1                         amd64        Python 3 bindings for gobject-introspection libraries
ii  python3-httplib2                                 0.20.2-2                                all          comprehensive HTTP client library written for Python3
ii  python3-idna                                     3.3-1                                   all          Python IDNA2008 (RFC 5891) handling (Python 3)
ii  python3-importlib-metadata                       4.6.4-1                                 all          library to access the metadata for a Python package - Python 3.x
ii  python3-ipython-genutils                         0.2.0-5                                 all          IPython vestigial utilities for Python 3
ii  python3-jeepney                                  0.7.1-3                                 all          pure Python D-Bus interface
ii  python3-jsonschema                               3.2.0-0ubuntu2                          all          An(other) implementation of JSON Schema (Draft 3 and 4) - Pytho>
ii  python3-jupyter-core                             4.9.1-1                                 all          Core common functionality of Jupyter projects for Python 3
ii  python3-jwt                                      2.3.0-1ubuntu0.2                        all          Python 3 implementation of JSON Web Token
ii  python3-keyring                                  23.5.0-1                                all          store and access your passwords safely
ii  python3-launchpadlib                             1.10.16-1                               all          Launchpad web services client library (Python 3)
ii  python3-lazr.restfulclient                       0.14.4-1                                all          client for lazr.restful-based web services (Python 3)
ii  python3-lazr.uri                                 1.0.6-2                                 all          library for parsing, manipulating, and generating URIs
ii  python3-ldb                                      2:2.4.4-0ubuntu0.22.04.2                amd64        Python 3 bindings for LDB
ii  python3-lib2to3                                  3.10.6-1~22.04                          all          Interactive high-level object-oriented language (lib2to3)
ii  python3-mako                                     1.1.3+ds1-2ubuntu0.1                    all          fast and lightweight templating for the Python 3 platform
ii  python3-markdown                                 3.3.6-1                                 all          text-to-HTML conversion library/tool (Python 3 version)
ii  python3-markupsafe                               2.0.1-2build1                           amd64        HTML/XHTML/XML string library
ii  python3-minimal                                  3.10.6-1~22.04                          amd64        minimal subset of the Python language (default python3 version)
ii  python3-more-itertools                           8.10.0-2                                all          library with routines for operating on iterables, beyond iterto>
ii  python3-netifaces:amd64                          0.11.0-1build2                          amd64        portable network interface information - Python 3.x
ii  python3-newt:amd64                               0.52.21-5ubuntu2                        amd64        NEWT module for Python3
ii  python3-oauthlib                                 3.2.0-1ubuntu0.1                        all          generic, spec-compliant implementation of OAuth for Python3
ii  python3-pip                                      22.0.2+dfsg-1ubuntu0.2                  all          Python package installer
ii  python3-pip-whl                                  22.0.2+dfsg-1ubuntu0.2                  all          Python package installer (pip wheel)
ii  python3-pkg-resources                            59.6.0-1.2ubuntu0.22.04.1               all          Package Discovery and Resource Access using pkg_resources
ii  python3-problem-report                           2.20.11-0ubuntu82.4                     all          Python 3 library to handle problem reports
ii  python3-pygments                                 2.11.2+dfsg-2                           all          syntax highlighting package written in Python 3
ii  python3-pyparsing                                2.4.7-1                                 all          alternative to creating and executing simple grammars - Python >
ii  python3-pyrsistent:amd64                         0.18.1-1build1                          amd64        persistent/functional/immutable data structures for Python
ii  python3-requests                                 2.25.1+dfsg-2                           all          elegant and simple HTTP library for Python3, built for human be>
ii  python3-secretstorage                            3.3.1-1                                 all          Python module for storing secrets - Python 3.x version
ii  python3-setuptools                               59.6.0-1.2ubuntu0.22.04.1               all          Python3 Distutils Enhancements
ii  python3-setuptools-whl                           59.6.0-1.2ubuntu0.22.04.1               all          Python Distutils Enhancements (wheel package)
ii  python3-six                                      1.16.0-3ubuntu1                         all          Python 2 and 3 compatibility library (Python 3 interface)
ii  python3-software-properties                      0.99.22.6                               all          manage the repositories that you install software from
ii  python3-systemd                                  234-3ubuntu2                            amd64        Python 3 bindings for systemd
ii  python3-talloc:amd64                             2.3.3-2build1                           amd64        hierarchical pool based memory allocator - Python3 bindings
ii  python3-texttable                                1.6.4-1                                 all          Module for creating simple ASCII tables — python3
ii  python3-traitlets                                5.1.1-1                                 all          Lightweight Traits-like package for Python 3
ii  python3-update-manager                           1:22.04.10                              all          python 3.x module for update-manager
ii  python3-urllib3                                  1.26.5-1~exp1                           all          HTTP library with thread-safe connection pooling for Python3
ii  python3-venv                                     3.10.6-1~22.04                          amd64        venv module for python3 (default python3 version)
ii  python3-wadllib                                  1.3.6-1                                 all          Python 3 library for navigating WADL files
ii  python3-websocket                                1.2.3-1                                 all          WebSocket client library - Python 3.x
ii  python3-wheel                                    0.37.1-2ubuntu0.22.04.1                 all          built-package format for Python
ii  python3-yaml                                     5.4.1-1ubuntu1                          amd64        YAML parser and emitter for Python3
ii  python3-zipp                                     1.0.0-3                                 all          pathlib-compatible Zipfile object wrapper - Python 3.x
ii  python3.10                                       3.10.6-1~22.04.2ubuntu1                 amd64        Interactive high-level object-oriented language (version 3.10)
ii  python3.10-dev                                   3.10.6-1~22.04.2ubuntu1                 amd64        Header files and a static library for Python (v3.10)
ii  python3.10-minimal                               3.10.6-1~22.04.2ubuntu1                 amd64        Minimal subset of the Python language (version 3.10)
ii  python3.10-venv                                  3.10.6-1~22.04.2ubuntu1                 amd64        Interactive high-level object-oriented language (pyvenv binary,>
ii  readline-common                                  8.1.2-1                                 all          GNU readline and history libraries, common files
ii  rpcsvc-proto                                     1.4.2-0ubuntu6                          amd64        RPC protocol compiler and definitions
ii  rsync                                            3.2.7-0ubuntu0.22.04.2                  amd64        fast, versatile, remote (and local) file-copying tool
ii  rsyslog                                          8.2112.0-2ubuntu2.2                     amd64        reliable system and kernel logging daemon
ii  run-one                                          1.17-0ubuntu1                           all          run just one instance of a command and its args at a time
ii  runc                                             1.1.4-0ubuntu1~22.04.1                  amd64        Open Container Project - runtime
ii  samba-libs:amd64                                 2:4.15.13+dfsg-0ubuntu1.1               amd64        Samba core libraries
ii  screen                                           4.9.0-1                                 amd64        terminal multiplexer with VT100/ANSI terminal emulation
ii  sed                                              4.8-1ubuntu2                            amd64        GNU stream editor for filtering/transforming text
ii  sensible-utils                                   0.0.17                                  all          Utilities for sensible alternative selection
ii  session-migration                                0.3.6                                   amd64        Tool to migrate in user session settings
ii  shared-mime-info                                 2.1-2                                   amd64        FreeDesktop.org shared MIME database and spec
ii  show-motd                                        3.10                                    all          show message of the day in interactive shells
ii  slirp4netns                                      1.0.1-2                                 amd64        User-mode networking for unprivileged network namespaces
ii  snapd                                            2.58+22.04                              amd64        Daemon and tooling that enable snap packages
ii  software-properties-common                       0.99.22.6                               all          manage the repositories that you install software from (common)
ii  squashfs-tools                                   1:4.5-3build1                           amd64        Tool to create and append to squashfs filesystems
ii  ssl-cert                                         1.1.2                                   all          simple debconf wrapper for OpenSSL
ii  strace                                           5.16-0ubuntu3                           amd64        System call tracer
ii  sudo                                             1.9.9-1ubuntu2.4                        amd64        Provide limited super user privileges to specific users
ii  systemd                                          249.11-0ubuntu3.9                       amd64        system and service manager
ii  systemd-hwe-hwdb                                 249.11.3                                all          udev rules for hardware enablement (HWE)
ii  systemd-sysv                                     249.11-0ubuntu3.9                       amd64        system and service manager - SysV links
ii  systemd-timesyncd                                249.11-0ubuntu3.9                       amd64        minimalistic service to synchronize local time with NTP servers
ii  sysvinit-utils                                   3.01-1ubuntu1                           amd64        System-V-like utilities
ii  tar                                              1.34+dfsg-1ubuntu0.1.22.04.1            amd64        GNU version of the tar archiving utility
ii  tcpdump                                          4.99.1-3ubuntu0.1                       amd64        command-line network traffic analyzer
ii  telnet                                           0.17-44build1                           amd64        basic telnet client
ii  time                                             1.9-0.1build2                           amd64        GNU time program for measuring CPU resource usage
ii  tmux                                             3.2a-4ubuntu0.2                         amd64        terminal multiplexer
ii  tnftp                                            20210827-4build1                        amd64        enhanced ftp client
ii  tracker                                          3.3.0-1                                 amd64        metadata database, indexer and search tool
ii  tracker-extract                                  3.3.0-1                                 amd64        metadata database, indexer and search tool - metadata extractors
ii  tracker-miner-fs                                 3.3.0-1                                 amd64        metadata database, indexer and search tool - filesystem indexer
ii  tzdata                                           2023c-0ubuntu0.22.04.1                  all          time zone and daylight-saving time data
ii  ubuntu-advantage-tools                           27.14.4~22.04                           amd64        management tools for Ubuntu Pro
ii  ubuntu-fan                                       0.12.16                                 all          Ubuntu FAN network support enablement
ii  ubuntu-keyring                                   2021.03.26                              all          GnuPG keys of the Ubuntu archive
ii  ubuntu-minimal                                   1.481                                   amd64        Minimal core of Ubuntu
ii  ubuntu-mono                                      20.10-0ubuntu2                          all          Ubuntu Mono Icon theme
ii  ubuntu-release-upgrader-core                     1:22.04.16                              all          manage release upgrades
ii  ubuntu-standard                                  1.481                                   amd64        The Ubuntu standard system
ii  ubuntu-wsl                                       1.481                                   amd64        Ubuntu on Windows tools - Windows Subsystem for Linux integrati>
ii  ucf                                              3.0043                                  all          Update Configuration File(s): preserve user changes to config f>
ii  udev                                             249.11-0ubuntu3.9                       amd64        /dev/ and hotplug management daemon
ii  udisks2                                          2.9.4-1ubuntu2                          amd64        D-Bus service to access and manipulate storage devices
ii  ufw                                              0.36.1-4build1                          all          program for managing a Netfilter firewall
ii  uidmap                                           1:4.8.1-2ubuntu2.1                      amd64        programs to help use subuids
ii  unattended-upgrades                              2.8ubuntu1                              all          automatic installation of security upgrades
ii  update-manager-core                              1:22.04.10                              all          manage release upgrades
ii  update-motd                                      3.10                                    all          complements pam_motd in libpam-modules
ii  upower                                           0.99.17-1                               amd64        abstraction for power management
ii  usb.ids                                          2022.04.02-1                            all          USB ID Repository
ii  usbmuxd                                          1.1.1-2build2                           amd64        USB multiplexor daemon for iPhone and iPod Touch devices
ii  usbutils                                         1:014-1build1                           amd64        Linux USB utilities
ii  usrmerge                                         25ubuntu2                               all          Convert the system to the merged /usr directories scheme
ii  util-linux                                       2.37.2-4ubuntu3                         amd64        miscellaneous system utilities
ii  uuid-dev:amd64                                   2.37.2-4ubuntu3                         amd64        Universally Unique ID library - headers and static libraries
ii  uuid-runtime                                     2.37.2-4ubuntu3                         amd64        runtime components for the Universally Unique ID library
ii  va-driver-all:amd64                              2.14.0-1                                amd64        Video Acceleration (VA) API -- driver metapackage
ii  vdpau-driver-all:amd64                           1.4-3build2                             amd64        Video Decode and Presentation API for Unix (driver metapackage)
ii  vim                                              2:8.2.3995-1ubuntu2.7                   amd64        Vi IMproved - enhanced vi editor
ii  vim-common                                       2:8.2.3995-1ubuntu2.7                   all          Vi IMproved - Common files
ii  vim-runtime                                      2:8.2.3995-1ubuntu2.7                   all          Vi IMproved - Runtime files
ii  vim-tiny                                         2:8.2.3995-1ubuntu2.7                   amd64        Vi IMproved - enhanced vi editor - compact version
ii  wget                                             1.21.2-2ubuntu1                         amd64        retrieves files from the web
ii  whiptail                                         0.52.21-5ubuntu2                        amd64        Displays user-friendly dialog boxes from shell scripts
ii  wsl-setup                                        0.2                                     amd64        WSL setup snap launcher
ii  x11-common                                       1:7.7+23ubuntu2                         all          X Window System (X.Org) infrastructure
ii  x11proto-dev                                     2021.5-1                                all          X11 extension protocols and auxiliary headers
ii  xauth                                            1:1.1-1build2                           amd64        X authentication utility
ii  xdg-user-dirs                                    0.17-2ubuntu4                           amd64        tool to manage well known user directories
ii  xkb-data                                         2.33-1                                  all          X Keyboard Extension (XKB) configuration data
ii  xorg-sgml-doctools                               1:1.11-1.1                              all          Common tools for building X.Org SGML documentation
ii  xtrans-dev                                       1.4.0-1                                 all          X transport library (development files)
ii  xxd                                              2:8.2.3995-1ubuntu2.7                   amd64        tool to make (or reverse) a hex dump
ii  xz-utils                                         5.2.5-2ubuntu1                          amd64        XZ-format compression utilities
ii  zlib1g:amd64                                     1:1.2.11.dfsg-2ubuntu9.2                amd64        compression library - runtime
ii  zlib1g-dev:amd64                                 1:1.2.11.dfsg-2ubuntu9.2                amd64        compression library - development
lines 950-1021/1021 (END)
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get --reinstall install postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
0 upgraded, 0 newly installed, 1 reinstalled, 0 to remove and 0 not upgraded.
1 not fully installed or removed.
After this operation, 0 B of additional disk space will be used.
E: Internal Error, No file name for postfix:amd64
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo dpkg --configure -a
Setting up postfix (3.6.4-1ubuntu1.1) ...

Postfix (main.cf) configuration was not changed.  If you need to make changes,
edit /etc/postfix/main.cf (and others) as needed.  To view Postfix
configuration values, see postconf(1).

After modifying main.cf, be sure to run 'systemctl reload postfix'.

Running newaliases
newaliases: fatal: bad string length 0 < 1: mydomain =
dpkg: error processing package postfix (--configure):
 installed postfix package post-installation script subprocess returned error exit status 75
Errors were encountered while processing:
 postfix
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get purge postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  postfix*
0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
1 not fully installed or removed.
After this operation, 4180 kB disk space will be freed.
Do you want to continue? [Y/n] Y
(Reading database ... 58630 files and directories currently installed.)
Removing postfix (3.6.4-1ubuntu1.1) ...
invoke-rc.d: could not determine current runlevel
postmulti: fatal: bad string length 0 < 1: mydomain =
   ...done.
Processing triggers for man-db (2.10.2-1) ...
(Reading database ... 58450 files and directories currently installed.)
Purging configuration files for postfix (3.6.4-1ubuntu1.1) ...
Processing triggers for ufw (0.36.1-4build1) ...
Processing triggers for rsyslog (8.2112.0-2ubuntu2.2) ...
invoke-rc.d: unknown initscript, /etc/init.d/rsyslog not found.
invoke-rc.d: could not determine current runlevel
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$ sudo apt-get install postfix
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  procmail postfix-mysql postfix-pgsql postfix-ldap postfix-pcre postfix-lmdb postfix-sqlite sasl2-bin | dovecot-common resolvconf postfix-cdb postfix-mta-sts-resolver
  postfix-doc
The following NEW packages will be installed:
  postfix
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 0 B/1245 kB of archives.
After this operation, 4180 kB of additional disk space will be used.
Preconfiguring packages ...
Selecting previously unselected package postfix.
(Reading database ... 58430 files and directories currently installed.)
Preparing to unpack .../postfix_3.6.4-1ubuntu1.1_amd64.deb ...
Unpacking postfix (3.6.4-1ubuntu1.1) ...
Setting up postfix (3.6.4-1ubuntu1.1) ...
Adding group `postfix' (GID 119) ...
Done.
Adding system user `postfix' (UID 110) ...
Adding new user `postfix' (UID 110) with group `postfix' ...
Not creating home directory `/var/spool/postfix'.
Creating /etc/postfix/dynamicmaps.cf
Adding group `postdrop' (GID 120) ...
Done.

Postfix (main.cf) was not set up.  Start with
  cp /usr/share/postfix/main.cf.debian /etc/postfix/main.cf
.  If you need to make changes, edit /etc/postfix/main.cf (and others) as
needed.  To view Postfix configuration values, see postconf(1).

After modifying main.cf, be sure to run 'systemctl reload postfix'.

invoke-rc.d: could not determine current runlevel
Created symlink /etc/systemd/system/multi-user.target.wants/postfix.service → /lib/systemd/system/postfix.service.
Processing triggers for ufw (0.36.1-4build1) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for rsyslog (8.2112.0-2ubuntu2.2) ...
invoke-rc.d: unknown initscript, /etc/init.d/rsyslog not found.
invoke-rc.d: could not determine current runlevel
cwcorella@DESKTOP-42SH73T:/mnt/f/production/repository/redpajama/redpajama.cpp/examples/redpajama/scripts$
