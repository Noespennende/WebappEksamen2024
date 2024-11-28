

# Sider

### arrangementer.no
app/page.tsx

Hva man kan gjøre på siden:
- Oversikt alle arrangementer
    - Viser arrangementers dato, navn, kategori, pris
    - Viser arrangementers deltakerstatus: Ledig, fullt, eller venteliste om mulig
- Kan sortere/filtrere på måned, år og kategori(type)
- Hvis admin: Viser Opprett arrangement knapp

API Kall siden gjør:

/events
* get


### arrangementer.no/events?type=sport&month=april
Bruker query params for å hente filtrert data

- Filter blir satt i frontend, og sender da denne forespørselen til backend.
- Backend svarer da på en slik query param med riktig data.

- Bruker gjør dropdown på "Sport" -> frontend sender API-kallet /events?type=sport.
- Bruker velger så måned "april" -> frontend sender API-kallet /events?type=sport&month=april


API Kall siden gjør:
/events?type=sport&month=april (query params)

### arrangementer.no/arrangement/:slug
app/events/page.tsx


Hva man kan gjøre på siden:
- Se informasjon for ett arrangement
- Melde seg på arrangementet
    - "Meld deg på" knapp viser "melde seg på"-funksjonalitet
        - Legger til én deltager
        - Kunne legge til flere deltakere
        - Kan ikke legge til flere deltakere utover det som er av ledig plasser 
            - Hvis arrangement har venteliste, kan sette hele påmeldingen på venteliste (hele gruppen)
        - Kan slette/fjerne lagt til deltakere
        - Ser samlet pris for alle deltakere
        - Kunne sende påmelding
        - 

KUN admin:
- Se admin panel for arrangementet
    - Redigere innhold -> Tar deg til /opprett/arrangement/id (utfylt)
        - Sjekk i hook: Denne har id med, så da blir det update-kall
    - Se alle påmeldte deltakere
        - Kunne forandre deltakerliste (Godkjenne/Avslå/Slett)
    - Kunne slette arrangement
    - Kunne laste ned statistikk
    - Kunne legge til deltaker manuelt

API Kall siden gjør:

/events/:event-slug (slette arrangementet)
* get
* delete

/events/:id/delete/:user-id (slette en bruker)
* delete

### arrangementer.no/opprett/arrangement/:id/
### arrangementer.no/opprett/arrangement/mal/:mal-id
( mal/:mal-id tilsvarer opprettelse av et arrangement med privat mal-oppsett)

Hook avgjør om det blir post eller update -> er id her eller ikke

Hva man kan gjøre på siden:

FELLES 
- Velge mal
    - Viser kun maler hvor private = False
- Velge kategori (type)
- Sette arrangement navn
- Sette arrangement slug
- Sette beskrivelse av arrangement
    - Legge til paragraf i beskrivelse
- Publisere arrangement

MED mal
- Velge dato
    - Hvis mal har faste ukedager, så må dato som velges være en av ukedagene
    - Vise hvilke ukedager som er valgbare
        - Hvis mal ikke tillater flere arrangementer på samme dag...
            - Sjekk om det finnes arrangementer som bruker samme mal, og samme dato - Får da ikke lov å opprette arrangement
- Hvis mal har fast pris...
    - Grå ut pris-valg
- Sette pris OM mal ikke har fastsatt pris
- Hvis mal har fast antall plasser...
    - Grå ut antall ledige plasser
- Sette antall ledige plasser OM mal ikke har fastsatt plasser


UTEN mal
- Velge dato
- Sette pris på arrangement
- Sette antall ledige plasser om ønskelig (ellers unlimited)
- Tillate venteliste 


API Kall siden gjør:

/templates
* get -> for å hente tilgjengelige maler (ikke-private)

/events/template/:id
* get -> når siden er /mal/:id

/events/create
* post

/events/:event-slug
* get
* update

### arrangementer.no/opprett/mal

Hva man kan gjøre på siden:
- Sette navn på mal
- Velge om mal er privat
- Velge om mal tillater andre arrangementer på samme dag
- Velge om mal tillater venteliste
- Velge om mal har fast-pris, og hva denne i så fall er
    - Hvis fast-pris, og ingen settes, så er fastpris lik 0 (default i Type)
- Velge om mal har begrenset antall plasser
- Låse mal til bestemte ukedager
    - Hvis ingen velges, så er alle dager tillatt 
    - .... og hvis alle velges er alle dager tillatt ;)
    - Backend sjekker mot Weekday[] liste
- Publisere mal


- Hvis mal privat
    - Videresend til opprett/arrangement/mal/:mal-id når publisert


API Kall siden gjør:

/templates/create
* post


# Typer

### Event
    - id
    - slug
    - body
    - pris
    - kategori
    - dato
    - adresse
    - deltakere
    - venteliste true/false
    - venteliste Participant[]

### Participant
    - id
    - navn
    - epost

### Template
    - (id) 
    - navn (er id)
    - private true/false
    - allowSameDayEvent true/false
    - waitlist true/false
    - setPrice true/false
    - price int
    - limitedParticipants true/false
    - maxParticipants 
    - fixedWeekdays Weekdays[]

### Weekdays ENUM 
    - Monday
    - Tuesday
    - Wednesday
    - Thursday
    - Friday
    - Saturday
    - Sunday

### Categories ENUM
    - Sport
    - Social
    - Meeting
    - Other

# API endepunkter

## /events
### Verb
> get

#### Responses
Successfull: {
    {
    success: true,
    Data: T
    }
    , 200
}
  
 Failour: {
    success: false,
    error: {
    code: 400 eller 404,
    message: String
    }
}



## /events/sort/
### Verb
> get
/events?type=sport&month=april

( Kommer tilbake til det )


## /events/create
### Verb
> post

#### Responses
Successfull: {
    {
    success: true,
    Data: T
    }
    , 201
}

Failour: {
    success: false,
    error: {
    code: 400, 401, 403 eller 404,
    message: String
    }
}



## /events/:event-slug
### Verb
>get
#### Responses
Successfull: {
    {
    success: true,
    Data: T
    }
    , 200}

Failour: {
    success: false,
    error: {
        code: 400 eller 404,
        message: String
    }
}

> update
#### Responses
 Successfull: {
    {
    success: true,
    Data: T
    }
    , 201
}

 Failour: {
    success: false,
    error: {
    code: 400, 401, 403 eller 404,
    message: String
    }
}
> delete
#### Responses
 Successfull: {
    {
    success: true,
    Data: T
    }
    , 201
}

Failour: {
    success: false,
    error: {
    code: 400, 401, 403 eller 404,
    message: String
    }
}


## /events/:id/delete/:user-id
### Verb
> delete
#### Responses
 Successfull: {
    {
    success: true,
    Data: T
    }
    , 201
}

Failour: {
    success: false,
    error: {
    code: 400, 401, 403 eller 404,
    message: String
    }
}

## /templates
### Verb
> get
#### Responses
Successfull: {
    {
    success: true,
    Data: T
    }
    , 200}

Failour: {
    success: false,
    error: {
        code: 400 eller 404,
        message: String
    }
}

## /templates/create
### Verb
> post
#### Responses
Successfull: {
    {
    success: true,
    Data: T
    }
    , 201
}

Failour: {
    success: false,
    error: {
    code: 400, 401, 403 eller 404,
    message: String
    }
}

## /events/template/:template-id
### Verb
> get
#### Responses
Successfull: {
    {
    success: true,
    Data: T
    }
    , 200}

Failour: {
    success: false,
    error: {
        code: 400 eller 404,
        message: String
    }
}






--------------------------


# Mappestruktur

# Frontend

## app –> sider, navigering
- Tar i bruk komponenter fra @/features/
- Tar i bruk services fra @/features/

#### app/page.tsx:
- Forside, førsteside til nettadreseen
- responderer til f.eks 
    - localhost:1783
    - vg.no
- Her vil vi kanskje egentlig ha alle events? (dvs neste punkt)


#### app/events/page.tsx -> EventsPage
- Samleside for alle events 
 - responderer til ex. localhost:1783/events
- bruker @/features/events/pages/index.tsx


#### app/events/[id]/page.tsx -> EventPage
- ett event - side
- Skisse_Arrangement_side.png
- responderer til ex. localhost:1783/events/[id] (slug)
- bruker @/features/events/pages/event.tsx
- bruker @/features/events/services/api.ts

#### app/admin/page.tsx –> CreatePage ?
- Siden for å opprette mal eller arrangementer
- responderer til ex. localhost:1783/admin 
    - Kanskje kalle den localhost:1783/admin/create eller bare /create?
- Bruker @/features/admin/pages/create.tsx
- Bruker @/features/admin/services/api.ts
    - Kanskje dele opp i /features/events/ og /features/template/ ?


## features/ –> Innhold på sider

- features/[feature]/pages 
    - bruker IKKE services, kun håndterer visning. Services, dvs. api, gjøres i app-mappen og sendes inn i komponenter her 

### features/events/pages -> 
- Komponentene som tilsvarer sider


#### /features/events/pages/event.js
- Side komponent for visning av ett event 
    - f.eks EventPage()
- tilhører siden /app/events/[id]/page.tsx
    - ex. localhost:1783/events/[id]


#### /features/events/pages/index.js
- oversiktside komponent for alle events, 
    - f.eks EventsPage()
- tilhører siden /app/events/page.tsx 
    - ex. localhost:1783/events

#### /features/admin/pages/create.tsx
- Opprette arrangement/mal: 
    - Skisse_Opprett_arrangement.png
    - Skisse_Opprett_mal.png



### /features/services –> API kall.

#### /features/events/services/api.ts
- API-kall:
    - hente arrangementer
    - hente filtrerte arrangmenter?


#### /features/admin/services/api.ts
- API-kall:
    - Opprettelse av arrangementer og maler?
    - hente maler? etc



# Backend
- Kun krav om å lagdele admin-delen:

2.8 (lagdele backend for admin) I denne delen skal du kun lagdele den delen som er koblet til oppgave `2.6`. Aktuelle regler må ivaretas.

Det under viser kun admin lagdeling:

#### @/features/admin/services/controller/index.ts
- CRUD operasjoner (app.post, app.get, etc.).
- Ytterste laget mot frontend
- Bruker service/index.ts
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/controller/index.ts

#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

#### @/features/admin/services/repository/index.ts
- Innerste laget. 
- Snakker mot DB - henter, oppretter etc, SQL/Prisma kode her.
- Verifiserer data (se på ../helpers og ../mappers mappene også)
- Returnerer data
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/repository/index.ts