# API endepunkter

## /courses
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
    code: 400,
    message: String
    }
}


## /courses/:id
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

## /course/lessions
### Verb

>get
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

>post
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

## /courses/:courseid/lessions/:lessionid
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


# Sider

### microls.no
Komponent navn: courses

Hva man kan gjøre på siden:
- opprette nytt kurs
- Signe up til ett kurs
- registrere ny bruker på siden
- registrere en admin bruker
- kunne se alle kursene
- navigere til alle kurs
- sortere kurs etter kategori
- se beskrivelse av hvert kurs
- se tittelen på kurset

API Kall siden gjør:

/courses
* get

### microls.no/kurs/opprett
komponent navn: create

hva kan man gjøøre på siden:
- opprette tittel på kurset
- opprette slug til kurset
- opprette en beskrivelse til kurset
- velge en kategori til kurset fra en liste med kategorier
- opprette en leksjon for kurset og legge den til listen av leksjoner i kurset
- legge til tittel, slug, ingress til leksjonen.
- legge til nye tekstbokser til leksjonens inhold.

API Kall siden gjør:

/courses
* post


### microls.no/kurs/:kursslug
komponent navn: course

hva man kan gjøre på siden:
- Se alle leksjoner under ett kurs
- Se alle leksjoners tittel, beskrivelse
- Se alle deltagere knyttet til hvert enkelt kurs
- kunne navigere til hver leksjon
- slette kurset
- kunne navigere til edit siden

/courses/:id
* get
* delete

### microls.no/kurs/:kursslug/edit
komponent navn: create

hva man kan gjøre på siden
- Endre tittel på kurset
- Endre slug til kurset
- Endre en beskrivelse til kurset
- velge en kategori til kurset fra en liste med kategorier
- Endre en leksjon for kurset og legge den til listen av leksjoner i kurset
- endre tittel, slug, ingress til leksjonen.
- legge til nye tekstbokser til leksjonens inhold.
- fjerne leksjoner fra kurset
- slette kurset


API Kall siden gjør:

/courses/:id
* get
* edit
* delete

### microls.no/kurs/:kursslug/leksjon/:leksjonslug
komponent navn: lession

hva kan man gjøre på siden:
- se tittel til lessionen
- se kategori til lessionen
- se innholdet til lessionen
- se kommentarer knyttet til lessionen
- se navn på brukeren som kommenterte hver kommentar
- skrive en ny kommentar til lessionen

API kall siden gjør:

/course/:courseid/lessions/:lessionid
* get
* post



