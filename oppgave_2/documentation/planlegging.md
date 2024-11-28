

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