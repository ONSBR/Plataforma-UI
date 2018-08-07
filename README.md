### User Interface

ui é o componente de plataforma responsável criar um ambiente operativo da plataforma através de interfaces gráficas, com o UI
você pode visualizar as apps dos sistemas, instâncias, memórias de cálculo, fazer reprodução de instâncias e iniciar reprocessamentos dentre outras coisas.

### Build

O build da aplicação é feito através de um arquivo Makefile, para buildar a aplicação execute o seguinte comando:

```sh
$ make
```

Após executar o make será criada uma pasta dist e o executável da aplicação ui.

### Deploy

O processo de deploy do ui na plataforma é feito através do installer, os componentes em Go são compilados e comitados dentro do installer então para atualizar a versão do ui para atualizar a versão do ui na plataforma utilize o seguinte comando:

```sh
$ mv front/ ~/installed_plataforma/Plataforma-Installer/Dockerfiles
$ plataforma --upgrade ui
```



### Organização do código

1. api/resources
    * São os contratos REST da api
2. api/services
    * São a implementação das chamadas de serviço da plataforma
3. etc
    * Pacote utilitário
4. frontend
    * Pacote de frontend feito com react usando o helper create-react-app
    1. ui/src/
        1. Features/
            1. Apps
                * Tela de listagem de aplicações por sistema
            3. ChooseSystem
                * Compoente para escolher o sistema para visualização
            4. Dashboard
                * Componente da tela principal
            6. Header
                * Header das páginas
            7. Logs
                * Tela de visualização de Logs
            8. ProcessInstanceView
                *  Tela de instâncias de processos
            10. ReprocessingView
                * Tela de processamento
            11. ReproductionView
                * Tela de reprodução
        2. Services/api
            * Camada de consumo dos serviços do backend
5. vendor
    * É um pacote do Go onde ficam todas as bibliotecas de terceiros, os arquivos deste pacote jamais devem ser alterados diretamente;