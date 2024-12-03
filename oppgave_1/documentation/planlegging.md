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
  
 Failure: {
    success: false,
    error: {
    code: 400,
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
 Failure: {
    success: false,
    error: {
    code: 400/404/500,
    message: String
    }
}



## /courses/:slug
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
  
 Failure: {
    success: false,
    error: {
    code: 400 eller 404,
    message: String
    }
}


> put
#### Responses
 Successful: {
    {
    success: true,
    Data: T
    }
    , 201
}

 Failure: {
    success: false,
    error: {
    code: 404/500,
    message: String
    }
}

## /courses/:id
### Verb

> delete
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
    code: 404/500,
    message: String
    }
}

## /courses/:courseslug/lessons/:lessonslug
### Verb

>get
#### Responses
Successful: {
    {
    success: true,
    Data: T
    }
    , 200
}

Failour: {
    success: false,
    error: {
    code: 404,
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
    code: 404,
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
        code: 404,
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
    , 200
}

Failour: {
    success: false,
    error: {
    code: 404/500,
    message: String
    }
}


## /categories
### Verb

>get
#### Responses
Successful: {
    {
    success: true,
    Data: T
    }
    , 200}

Failure: {
    success: false,
    error: {
        code: 400,
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
/categories
* get

### microls.no/kurs/opprett
komponent navn: create

hva kan man gjøre på siden:
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

/courses/:slug
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

/courses/:slug
* get
* edit
* delete

### microls.no/kurs/:kursslug?lesson=:leksjonslug
komponent navn: lesson

hva kan man gjøre på siden:
- se tittel til leksjonen
- se kategori til leksjonen
- se innholdet til leksjonen
- se kommentarer knyttet til leksjonen
- se navn på brukeren som kommenterte hver kommentar
- skrive en ny kommentar til leksjonen

API kall siden gjør:

/course/:courseid/lessons/:lessonslug
* get
* post



# TextEditor Dokumentasjon

I denne versjonen er det implementert en grunnleggende tekstboks editor med "TipTap".
Denne gir økt formatering på tekstboks-innhold under leksjoner.

Prosjektet har en "vanlig" tekstboks også tilgjengelig, med komponentnavn "TextBox".

## Bruke TipTapTextBox
TipTapTextBox brukes slik:

        <TipTapTextBox
            key={`${field.orderPosition}`} 
            text={field.text}
            orderPosition={field.orderPosition}
            onChange={(updatedText) => handleTipTapChange(updatedText, lessonIndex, index)}
            onRemove={() => removeTextBox(index)}
          />
        
Legg merke til at onChange() bruker handleTipTapChange(), og ikke handleLessonFieldChange().
Dette er fordi TipTap returnerer teksten i noe annet format enn vanlig textarea-felt gjør. For å derfor få det på en standard som gjeldende logikk mot backend kan håndtere, trenger vi å formere TipTap-output, så handleLessonFieldChange() kan behandle det som et text-field.


### For å bytte tekstboks editor:
- Under "CreateLessonFields"
    - Under hvor det står {/* Leksjonens tekstbokser */}, bytt enkelt ut "TipTapTextBox" komponentet med et annet komponent som gir tekst-formatering, og send med de nødvendige paramterne.
    -     
            <TextBox
              key={field.orderPosition}
              text={field.text}
              orderPosition={field.orderPosition}
              onChange={(e) => handleLessonFieldChange(e, lessonIndex, index)}
              onRemove={() => removeTextBox(index)}
            />


### Vise TipTap-formatert innhold
Vi har også implementert en grunnleggende visning av HTML-koden i visningen for Leksjoner.
I denne  "html-to-react". Dette er en enkel og "ut-av-boksen" løsning for å rendre ut HTML-kode i komponentet.
- Alt som trengs er en "const parser = Parser()" og deretter bruke denne til å rendre ut (parse): "{parser.parse(text.text)}"
    - (Se ved return() i Lesson.tsx)
