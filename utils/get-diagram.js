export const diagram = `graph LR 
    subgraph primul_subgraph
        direction LR  
        1[Start] -- Atingerea obiectivelor --> 2[Stabileste Obiective si elaboreaza buget]
        2 -- Obiective stabilite --> 3[Decizie]
        3 -- Gestionare cashflow --> 4[Gestioneaza cashflow/Monitorizeaza executia bugetara]
        3 -- Documentare procese --> 5[Documenteaza procese]
        3 -- Gestionare neconformitati --> 6[Gestioneaza neconformitati]
        4 -- Cashflow gestionat --> 7[Gestionare plati]
        7 -- Plati gestionate --> 8[Plateste dividentele]
        %% PANA LA ID 8
    end

    subgraph al_doilea_subgraph
        direction LR  
        9[Start] -- Transmite rapoarte obligatorii --> 10[Transmite rapoarte obligatorii]
        9 -- Deseuri --> 11[Gestioneaza deseuri]
        9 -- Metrologie --> 12[Efectueaza verificari metrologice]
        12 -- Solicitare autorizatii --> 15[Obtine si mentine autorizatii]
        9 -- Solicitare informatii --> 13[Furnizeaza informatii]
        9 -- Declaratii --> 14[Depune declaratii]
        %% PANA LA ID 15
    end 

    subgraph al_treilea_subgraph_1
        direction LR
        
        %% Prima parte a fluxului până la "Programeaza lucrari"
        16[Start] -- Monitorizare licitatii publice  --> 17[Identifica oportunitatile de ofertare]
        16 -- Informatii --> 18[Furnizeaza informatii cu scopul obtinerii unei cereri de oferta]
        16 -- Promovare  --> 19[Lanseaza campanie de promovare]
        16 -- Gestionare recurenta serviciilor  --> 20[Gestioneaza recurenta serviciilor]

        %% Legături spre "Trimite oferta"
        17 -- Oportunitate de ofertare identificata --> 21[Cerere oferta solicitata]
        18 -- Informatii furnizate  --> 21
        19 -- Campanie de promovare lansata  --> 21
        20 -- Recurenta servicii gestionata  --> 21

        %% Pas final "Trimite oferta"
        21 --> 22[Trimite oferta]
        22[Trimite oferta] -- Oferta finalizata --> 23["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Formular oferta</div>"]
        23 -- Oferta acceptata --> 24[Incheiere contract]
        24[Incheiere contract] -- Contract incheiat --> 25["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span>Formular contract<br/></div>"]
        20 -- Conditii acceptate --> 25
        25 -- Lucruri acceptate -->  26[Programeaza lucrari]
        27[Gestioneza cerere de aprovizionare] --Gestionare cererede aprovizionare --> 26
        28[Deruleaza contract special] --Contract special manageriat --> 29[Contract special]
    end

    subgraph al_trilea_subgraph_2
   
        26 -- Lucrari programate --> nodelinkWork1000(( ))

        %% Primul proces
        nodelinkWork1000(( )) --> nodelinkWork1(( )) -- Supraveghere echipamente RSVTI --> 30[Supravegheaza echipamente RSVTI]
        30 -- Echipamente RSVTI supravegheat --> 61["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Livrabile Expert RSVTI</div>"] --> nodelinkWork32

        %% Al doilea proces
        nodelinkWork1000(( )) --> nodelinkWork2(( )) -- Montare hota --> 31[Monteaza hota]
        31 -- Hota montata --> 62["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV general</div>"] --> nodelinkWork32

        %% Al treilea proces
        nodelinkWork1000(( )) --> nodelinkWork3(( )) -- Proiectare instalatie termica --> 32[Elaboreaza proiect instalatie termica]
        32 -- Proiect instalatie termica intocmit --> 63["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Proiect tehnic instalatie termica</div>"] --> nodelinkWork32

        %% Al patrulea proces
        nodelinkWork1000(( )) --> nodelinkWork4(( )) -- Reparare hota --> 33[Repara hota]
        33 -- Hota reparata --> 64["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV general</div>"] --> nodelinkWork32

        %% Al cincilea proces
        nodelinkWork1000(( )) --> nodelinkWork5(( )) -- Montare/instalare centrala termica --> 34[Monteaza/instaleaza centrala termica]
        34 -- Centrala termica montata/instalata --> 65["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV Montare/instalare PT-A1 , PV Montare/instalare PT-C9 , PV Montare/instalare PT-C1 </div>"] --> nodelinkWork32

        %% Al saselea proces
        nodelinkWork1000(( )) --> nodelinkWork6(( )) -- Curatare hota --> 35[Asigura mentenanta hota]
        35 -- Mentenanta hota asigurata --> 66["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General,Poze lucrare</div>"] --> nodelinkWork32

        %% Al saptelea proces
        nodelinkWork1000(( )) --> nodelinkWork7(( )) -- Autorizare centrala termica --> 36[Autorizeaza centrala termica]
        36 -- Centrala termica autorizata --> 67["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Anexa 3-1</div>"] --> nodelinkWork32

        %% Al optulea proces
        nodelinkWork1000(( )) --> nodelinkWork8(( )) -- Montare/instalare echipament frigorific --> 37[Monteaza/instaleaza echipament frigorific]
        37 -- Echipament frigorific montat/instalat --> 68["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al noualea proces
        nodelinkWork1000(( )) --> nodelinkWork9(( )) -- Reparatie centrala termica --> 38[Repara centrala termica]
        38 -- Centrala termica reparata --> 69["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV Reparatie PT-A1</div>"] --> nodelinkWork32

        %% Al zecelea proces
        nodelinkWork1000(( )) --> nodelinkWork10(( )) -- Reparatie echipament frigorific --> 39[Repara echipament frigorific]
        39 -- Echipament frigorific reparat --> 70["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al unsprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork11(( )) -- Revizie centrala termica --> 40[Efectueaza revizie centrala termica]
        40 -- Revizie centrala termica efectuata --> 71["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV Intretinere PT-A1</div>"] --> nodelinkWork32

        %% Al doisprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork12(( )) -- Revizie echipament frigorific --> 41[Efectueaza revizie echipament frigorific]
        41 -- Revizie echipament frigorific efectuata --> 72["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al treisprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork13(( )) -- Verificare si reglare supapa de siguranta --> 42[Verifica si regleaza supapa de siguranta]
        42 -- Supapa de siguranta verificata si reglata --> 73["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Buletin de verificare si reglare</div>"] --> nodelinkWork32

        %% Al paisprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork14(( )) -- Proba de presiune centrala termica, vas de expansiune, recipient metalic sau conducta --> 43[Efectueaza proba de presiune la centrala termica, vas de expansiune, recipient metalic sau conducta]
        43 -- Proba de presiune efectuata --> 74["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al cincisprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork15(( )) -- Curatare cos de fum --> 44[Curata cos de fum]
        44 -- Cos de fum curatat --> 75["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Adeverinta de coserit</div>"] --> nodelinkWork32

        %% Al saisprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork16(( )) -- Verificare instalatie de gaz --> 45[Verifica instalatie de gaz]
        45 -- Instalatie de gaz verificata --> 76["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Anexa 4 Fisa de verificare ORD.179</div>"] --> nodelinkWork32

        %% Al saptesprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork17(( )) -- Montare cos de fum --> 46[Monteaza cos de fum]
        46 -- Cos de fum montat --> 77["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al optsprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork18(( )) -- Revizie instalatie de gaz --> 47[Efectueaza revizie instalatie de gaz]
        47 -- Revizie instalatie de gaz efectuata --> 78["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Anexa 5 Fisa de revizie ORD.197,Buletin de sigilare/Desigilare/Desfintare</div>"] --> nodelinkWork32

        %% Al nouasprezecelea proces
        nodelinkWork1000(( )) --> nodelinkWork19(( )) -- Reparare cos de fum --> 48[Repara cos de fum]
        48 -- Cos de fum reparat --> 79["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al douazecilea proces
        nodelinkWork1000(( )) --> nodelinkWork20(( )) -- Reparare instalatie de gaz --> 49[Repara instalatia de gaz]
        49 -- Instalatie de gaz reparata --> 80["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General,Buletin de Sigilare/Desigilare/Desfintare</div>"] --> nodelinkWork32

        %% Al douazeci si unulea proces
        nodelinkWork1000(( )) --> nodelinkWork21(( )) -- Revizie arzator --> 50[Efectueaza revizie arzator]
        50 -- Revizie arzator efectuata --> 81["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV Intretinere PT-A1 ,PV Intretinere PT-C2 ,PV Intretinere PT-C11</div>"] --> nodelinkWork32

        %% Al douazeci si doilea proces
        nodelinkWork1000(( )) --> nodelinkWork22(( )) -- Modificare instalatie de gaz --> 51[Modifica instalatia de gaz]
        51 -- Instalatie de gaz modificata --> 82["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General, Buletin de Sigilare/Desigilare/Desfintare</div>"] --> nodelinkWork32

        %% Al douazeci si treilea proces
        nodelinkWork1000(( )) --> nodelinkWork23(( )) -- Autorizare arzator --> 52[Autorizeaza arzator]
        52 -- Arzator autorizat --> 83["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Anexa 2 PT-C11 , Anexa 3 PT-C2 , Anexa 3 PT-A1</div>"] --> nodelinkWork32

        %% Al douazeci si patrulea proces
        nodelinkWork1000(( )) --> nodelinkWork24(( )) -- Proiectare instalatie de gaz --> 53[Elaboreaza proiect instalatie de gaz]
        53 -- Proiect instalatie de gaz intocmit --> 84["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Proiect tehnic instalatie de gaz</div>"] --> nodelinkWork32

        %% Al douazeci si cincilea proces
        nodelinkWork1000(( )) --> nodelinkWork25(( )) -- Reparatie arzator --> 54[Repara arzator]
        54 -- Arzator reparat --> 85["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV Reparare PT-C11,PV Reparare PT-A1, PV Reparare PT-C2</div>"] --> nodelinkWork32

        %% Al douazeci si saselea proces
        nodelinkWork1000(( )) --> nodelinkWork26(( )) -- Programeaza lucrari --> 55[Programeaza lucrari]
        55 -- Lucrari programate --> 86["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Formular oferta</div>"] --> nodelinkWork32

        %% Al douazeci si saptelea proces
        nodelinkWork1000(( )) --> nodelinkWork27(( )) -- Montare/instalare arzator --> 56[Monteaza/instaleaza arzator]
        56 -- Arzator montat/instalat --> 87["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV Montare/Instalare PT-A1 , PV Montare/Instalare PT-C11, PV Montare/Instalare PT-C2</div>"] --> nodelinkWork32

        %% Al douazeci si optulea proces
        nodelinkWork1000(( )) --> nodelinkWork28(( )) -- Programeaza lucrari --> 57[Programeaza lucrari]
        57 -- Lucrari programate --> 88["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Formular oferta</div>"] --> nodelinkWork32

        %% Al douazeci si noualea proces
        nodelinkWork1000(( )) --> nodelinkWork29(( )) -- Punere in functiune echipament tehnic --> 58[Efectuare PIF echipament tehnic]
        58 -- PIF Efectuat --> 89["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>Tipizat producator echipament</div>"] --> nodelinkWork32

        %% Al treizecilea proces
        nodelinkWork1000(( )) --> nodelinkWork30(( )) -- Consultanta tehnica --> 59[Ofera servicii de consultanta tehnica]
        59 -- Servicii de consultanta tehnica oferite --> 90["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV General</div>"] --> nodelinkWork32

        %% Al treizeci si unulea proces
        nodelinkWork1000(( )) --> nodelinkWork31(( )) -- Operatiuni DDD --> 60[Executa operatiuni DDD]
        60 -- Operatiuni DDD executate --> 91["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span><br/>PV DDD</div>"] --> nodelinkWork32
    end

     subgraph al_trilea_subgraph_3
     nodelinkWork32(( )) -- Procesare documente de lucru --> 92[Proceseaza documente]
     92 -- Trimite factura --> 93[Intocmeste si trimite factura]
     93 -- Factura trimisa --> 94["<div style='text-align: center;'><span style='font-size: 30px;'>📄</span>Factura fiscala<br/></div>"] 
     94 -- Creanta --> 95[Urmareste, inregistreaza si recupereaza creante] -- Creanta recuperata -->nodelinkWork35(( ))
     nodelinkWork33(( )) -- Satisfactie client --> 96[Evalueaza satisfactia clientului] -- Evaluare efectuata -->nodelinkWork34(( ))
     %% Pana la ID 96 si NodeLink 35
     end

     subgraph al_patrulea_subgraph
      direction LR
     97[Selecteaza furnizor] -- Cerere de oferta furnizor  --> 98[Selecteaza oferta de pret]
     98 --Oferta de pret selectata--> nodelinkWork36(( ))

     nodelinkWork36(( )) -- Asigurare stoc --> 100[Asigura / Gestioneaza stoc critic]
     nodelinkWork36(( )) --> 99
     97 -- Furnizor acceptat --> 99[Incheie contract cadru] -- Contract cadru incheia --> nodelinkWork37(( ))
     nodelinkWork37(( )) -- Nevoia de aprovizionare -->101[Comanda materiale/ echipamente]
     100[Asigura / Gestioneaza stoc critic] --> 101[Comanda materiale/ echipamente]

     101 -- Materiale/echipamente comandate --> nodelinkWork38(( )) -- Receptie materiale/echipamente --> 102[Receptie materiale/echipamente]
    102 -- Echipamente/materiale receptionate --> nodelinkWork39(( )) -- Material/echipament neconform --> 103[Returneaza echipamente/materiale]
     nodelinkWork40(( )) -- Realizare inventar --> 104[Realizeaza inventar] -- Inventar realizat -->  nodelinkWork41(( ))
    %% Terminat subgraph 4 ID104 si Nodelink 41
     end

     subgraph al_cincilea_subgraph
     direction LR

    nodelinkWork42(( )) -- Gestionare documente contabile --> 105[Gestioneaza documente contabile]
    105 -- Dosar contabilitate intocmit --> nodelinkWork43(( ))

    nodelinkWork44(( )) -- Verificare evidenta contabila --> 106[Verifica evidenta contabila]
    106 -- Evidenta contabila verificata --> nodelinkWork45(( ))

    %%Terminat subgraph 5 ID 106 NodeLink 45
    end    

subgraph al_saselea_subgraph
     direction LR

     nodelinkWork46(( )) -- Necesar resursa umana --> 107[Recruteaza resursa umana] -- Resursa umana recrutata -->109[Angajeaza personal]
     nodelinkWork47(( )) -- Actualizare ROI --> 108[Elaborează și actualizează Regulamentul de Ordine Interioara] -- ROI actualizat --> nodelinkWork48(( ))


     109 -- Personal angajat --> nodelinkWork49(( ))
     nodelinkWork49(( )) -- Concedii --> 110[Planifica/Acorda/ Gestioneaza concedii]
     nodelinkWork49(( )) -- Medicina muncii --> 111[Asigura medicina muncii]
     111 -- Medicina muncii asigurata --> nodelinkWork52(( )) -- Instruire periodica SSM-->118[Asigura medicina muncii] -- Instruire periodica SSM asigurata--> nodelinkWork53(( ))

     nodelinkWork49(( )) -- Adeverinte --> 112[Elibereaza adeverinta] -- Adeverinta eliberata -->nodelinkWork54(( ))

     nodelinkWork49(( )) -- Gestionarea acordarii de beneficii --> 113[Gestionează acordarea de beneficii] -- Acordarea de beneficii gestionate --> nodelinkWork55(( ))

     nodelinkWork49(( )) -- Dezvoltare competente angajati--> 114[Dezvolta competentele angajatilor] -- Competente angajati dezvoltate --> nodelinkWork56(( ))

     nodelinkWork49(( )) -- Negociere salariala--> 115[Negociaza salariu] -- Salariu negociat --> nodelinkWork57(( ))
     nodelinkWork57(( )) --> 116
     nodelinkWork49(( )) -- Incetare contract de munca--> 116[Inceteaza contract de munca] -- Contract de munca incetat --> nodelinkWork58(( ))
    
     nodelinkWork50(( )) -- Evaluare performanta angajatilor --> 117[Evalueaza performanta angajatilor]
     117 -- Performanta evaluata -->  nodelinkWork51(( )) 
     nodelinkWork51(( )) --> 113
     nodelinkWork51(( )) --> 114
     nodelinkWork51(( )) --> 115
     nodelinkWork51(( )) --> 116
%%Terminat subgraph 6 ID 118 NodeLink 58
      end`;
