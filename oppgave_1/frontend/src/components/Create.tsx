'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse, updateCourse } from "@/lib/services/api";
import { useLesson } from "@/hooks/useLesson";
import { useComment } from "@/hooks/useComments";
import { useCourse } from "@/hooks/useCourse";
import CreateCourseFields from "./CreateCourseFields";
import CreateLessonFields from "./CreateLessonFields";
import LessonCreateList, { LessonListProps } from "./LessonCreateList";
import CourseReview from "./CourseReview";
import FormCheck from "./FormCheck";
import NavigationByStep from "./NavigationByStep";
import { Lesson, Course, CourseFieldsProps, CreateCourse, CreateLesson, LessonText, CreateLessonText, Result, Failure, ErrorCode } from "@/lib/types";
import { useCategories } from "@/hooks/useCategoriest";
import { validateCreateLesson, validateLesson } from "@/lib/types/schema";

  const isValidCourse = (courseFields: CourseFieldsProps['courseFields']) => {
    const invalidFields: string[] = [];

    const categoryId = 'categoryId' in courseFields ? courseFields.categoryId : courseFields.category.id;
  
    if (!courseFields.title) invalidFields.push('title');
    if (!courseFields.slug) invalidFields.push('slug');
    if (!courseFields.description) invalidFields.push('description');
    console.log("Category value: ", categoryId);
    if (!categoryId) invalidFields.push('categoryId');
  
   
    if (invalidFields.length > 0) {
      console.log("Invalid course fields: ", invalidFields);
      return false;
    }
    return true;
  };

  const isValid = (lessons: (CreateLesson | Lesson)[]): boolean => {
    return lessons.every(lesson => {
      return lesson.title 
      && lesson.slug && lesson.preAmble;
    });
  };
  export const courseCreateSteps = [
    { id: '1', name: 'Kurs' },
    { id: '2', name: 'Leksjoner' },
  ]

export default function Create(props: { courseSlug?: string }) {
    const { courseSlug } = props;
    
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [current, setCurrent] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(0);
    const [courseFields, setCourseFields] = useState<(CreateCourse | Course)>({
      title: "",
      slug: "",
      description: "",
      categoryId: "",
      lessons: [],
    });
    
    
    const { course } = courseSlug ? useCourse(courseSlug) : { course: null }
    //const lesson = useLesson(courseSlug, lessonSlug);
    const [lessons, setLessons] = useState<(CreateLesson | Lesson)[]>(course?.lessons || []);


    const {categories} = useCategories()

    const categoryNames = categories.map((category: { name: string; }) => category.name);

    useEffect(() => {
      if (course?.lessons) {
        setLessons(course.lessons);
      }
    }, [course]);

    useEffect(() => {
      if (course?.lessons) {
        const validatedLessons = course.lessons.map((lesson) => {
          const parseResult = validateLesson(lesson);
          if (parseResult.success) {
            return parseResult.data; // Validerte data
          } else {
            // Håndter feil hvis nødvendig
            console.error("Invalid lesson data", parseResult.error);
            return null; // Eller en fallback-verdi
          }
        }).filter((lesson) => lesson !== null);
    
        setLessons(validatedLessons as Lesson[]);
      }
    }, [course]);

    useEffect(() => {
      if (course) {
        const lessonArray: Lesson[] = course.lessons ? course.lessons : [];
    
        setCourseFields((prevCourseFields) => ({
          ...prevCourseFields,
          title: course.title,
          slug: course.slug,
          description: course.description,
          categoryId: course.category.id,
          lessons: lessonArray.map((l : Lesson) => ({
            id: l.id,
            title: l.title,
            slug: l.slug,
            preAmble: l.preAmble,
            comments: l.comments ?? [], 
            text: l.text?.map((t: LessonText) => ({
              text: t.text,
              orderPosition: 0,
            })) ?? [], 
          })),
        }));
      }
    }, [course]);
    
    const step = courseCreateSteps[current]?.name;
  
    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
    
      setFormError(false);
      setSuccess(false);
    
      const categoryId = 'categoryId' in courseFields ? courseFields.categoryId : courseFields.category.id;
      if (lessons.length > 0 && isValid(lessons) && isValidCourse(courseFields)) {
        
        const categoryId = 'categoryId' in courseFields ? courseFields.categoryId : courseFields.category.id;
        let post = {
          title: courseFields.title,
          slug: courseFields.slug,
          description: courseFields.description,
          categoryId: categoryId,
          lessons: lessons.map((lesson) => {
            const originalLesson = course?.lessons?.find((l) => l.slug === lesson.slug);
            return {
              ...lesson,
              ...(originalLesson?.id ? { id: originalLesson.id } : {}),
            };
          }),
        };
    
        try {
          if (!course  && (courseFields as Course)) {
            await createCourse(post);
          } else {
            console.log("IT WORKS");
            console.log("IT WORKS " + JSON.stringify(post));

            if (courseSlug) {
              console.log("SLUG " + courseSlug);

              console.log("course orignal lessons ", course?.lessons)
              console.log("Det vi sender til update ", post)
              await updateCourse(courseSlug, post)
            }
            // Gjøre await editCourse() kall her
          }
    
          setCurrent(2);
          setSuccess(true);
        } catch (error: unknown) {
          console.error("Error creating course:", error);
        
          // Sjekk om error er en Failure
          if (error && (error as Failure).error) {
            const errorResponse = (error as Failure).error;
        
            // Håndter feilkoder spesifikt ved å bruke enum
            switch (errorResponse.code) {
              case ErrorCode.COURSE_SLUG_NOT_UNIQUE:
                alert("Kan ikke lage kurs. Sluggen for kurset er ikke unik.");
                break;
              case ErrorCode.LESSON_SLUG_NOT_UNIQUE:
                alert("Kan ikke lage leksjoner. Sluggene er ikke unike innad i kurset.");
                break;
              default:
                alert(`Feil: ${errorResponse.message || 'Ukjent feil'}`);
            }
          } else {
            alert("En uventet feil oppstod. Vennligst prøv igjen.");
          }
          setFormError(true);
        }
        
    } else {
      setFormError(true);
    }
  }
    
    const addTextBox = () => {
      const updatedLessonText = lessons.map((lesson, i) => {
        if (currentLesson === i) {
          const text = lesson.text ?? [];
          const newText = [
            {
              text: "",
              orderPosition: text.length,
            },
          ];
          return {
            ...lesson,
            text: [...text, ...newText],
          };
        }
        return lesson;
      });
      setLessons(updatedLessonText);
    };
  
    const removeTextBox = (index: number) => {
      if (!lessons[currentLesson]?.text) {
        // Hvis `text` ikke finnes, returner tidlig eller håndter feilen.
        return;
      }
    
      const removed = lessons[currentLesson].text.filter((_, i) => i !== index);
    
      const updatedLessonText = lessons.map((lesson, i) => {
        if (currentLesson === i) {
          return {
            ...lesson,
            text: removed,
          };
        }
        return lesson;
      });
    
      setLessons(updatedLessonText);
    };
  
    const handleStep = (index: number) => {
        setFormError(false);
      
        switch (index) {
          case 0: 
            setCurrent(0);
            break;
      
          case 1: 
            if (isValidCourse(courseFields)) {
              setCurrent(1);
            } else {
              setFormError(true);
            }
            break;
      
          case 2: 
         
            if (isValidCourse(courseFields) && isValid(lessons)) {
              setCurrent(2);
            } else {
              setFormError(true);
            }
            break;
      
          default:
            break;
        }
      };

      const handleCourseFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        index?: number
      ) => {
        const { name, value } = event.target;
        console.log(`Field changed: ${name} = ${value}`);
      
        if (current === 0) {
          setCourseFields((prev) => ({
            ...prev,
            [name]: value,
          }));
          console.log("handlelessonfield " + JSON.stringify(courseFields));
          if (isValidCourse(courseFields)) {
            //setCurrent(1); 
          }
        } else if (current === 1 && typeof index === 'number') {
          // Sjekk om lessons[currentLesson]?.text eksisterer
          const updatedText = lessons[currentLesson]?.text?.map((comment, i) => {
            if (i === index && name === 'text') {
              return { ...comment, text: value };
            }
            return comment;
          }) || []; // Hvis undefined, fallback til tom array
      
          const updatedLessons = lessons.map((lesson, i) => {
            if (i === currentLesson) {
              return {
                ...lesson,
                [name]: value,
                text: updatedText,
              };
            }
            return lesson;
          });
      
          setLessons(updatedLessons);
        }
      };

      const handleLessonFieldChange = (
        event: { target: { name: string; value: string } },
        lessonIndex: number,
        index?: number,
      ) => {
        const { name, value } = event.target;
      
        // Hent den nåværende leksjonen
        const currentLesson = lessons[lessonIndex];
      
        if (!currentLesson || (currentLesson.text && index && (index < 0 || index >= currentLesson.text?.length))) {
          console.log("uhu: Index out of bounds", index);
          return;
        }
      
        // Hvis vi oppdaterer tittel eller slug
        if (name === 'title' || name === 'slug' || name === 'preAmble') {
          const updatedLessons = lessons.map((lesson, i) => {
            if (i === lessonIndex) {
              return {
                ...lesson,
                [name]: value,
              };
            }
            return lesson;
          });
      
          setLessons(updatedLessons);
        }
        // Hvis vi oppdaterer tekstfelt
        else if (name === 'text') {
          const updatedText = currentLesson.text?.map((textField, i) => {
            if (i === index) {
              return {
                ...textField,
                text: value,
              };
            }
            return textField;
          });
      
          const updatedLessons = lessons.map((lesson, i) => {
            if (i === lessonIndex) {
              return {
                ...lesson,
                text: updatedText,
              };
            }
            return lesson;
          });
      
          setLessons(updatedLessons);
        }
      };
      
      
      

  
    const changeCurrentLesson = (index: number) => {
      setCurrentLesson(index);
    };
 
   
    const addLesson = () => {
      setLessons((prev) => [
        ...prev,
        {
          title: "",
          slug: "",
          preAmble: "",
          comments: [],
          text: [],
        },
      ]);
      setCurrentLesson(lessons.length);
    };


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategoryId = event.target.value;
    
      const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);
      console.log("selected cat " + selectedCategory?.name)
      
      //const categoryId = 'categoryId' in courseFields ? courseFields.categoryId : courseFields.category.id;
      setCourseFields((prev) => {
        // Hvis courseFields har category, sett category, ellers sett categoryId
        if ('category' in prev) {
          return {
            ...prev,
            category: selectedCategory || prev.category, // Hvis selectedCategory finnes, sett den, ellers behold eksisterende category
          };
        } else {
          return {
            ...prev,
            categoryId: selectedCategory ? selectedCategory.id : "", // Hvis selectedCategory finnes, sett den, ellers behold eksisterende categoryId
          };
        }
      });
    };
  
    return (
      <>
      
      <NavigationByStep
        courseCreateSteps={courseCreateSteps}
        currentStep={step} 
        handleStepChange={(index) => handleStep(index)} 
        isFormValid={isValidCourse(courseFields) && isValid(lessons)}
        onSubmit={() => handleSubmit({ preventDefault: () => {} })}
        />
        <h2 className="text-xl font-bold" data-testid="title">
          Lag nytt kurs
        </h2>
        <form className="mt-8 max-w-4xl" data-testid="form" noValidate>
          {current === 0 ? (
            <CreateCourseFields 
              courseFields={courseFields}
              handleFieldChange={handleCourseFieldChange}
              categories={categories}
              handleCategoryChange={handleCategoryChange}
    />
          ) : null}

          {current === 1 ? (
            <div
              data-testid="lesson_step"
              className="grid w-full grid-cols-[350px_minmax(50%,_1fr)] gap-12"
            >
              <LessonCreateList 
                lessons={lessons}
                currentLessonIndex={currentLesson}
                changeCurrentLesson={setCurrentLesson}
                addLesson={addLesson}
              />
              {lessons?.length > 0 ? (
                <CreateLessonFields 
                  lesson={lessons[currentLesson]}
                  lessonIndex={currentLesson}
                  handleLessonFieldChange={handleLessonFieldChange}
                  addTextBox={addTextBox}
                  removeTextBox={removeTextBox}
                  
                />
              ) : null}
            </div>
          ) : null}

         {current === 2 ? (
          <CourseReview
            courseFields={{
              ...courseFields,
              category: 'categoryId' in courseFields 
                ? categories.find(cat => cat.id === courseFields.categoryId) || { id: '', name: '' }
                : courseFields.category, // Hvis courseFields har category, bruk den direkte
            }}
            lessons={lessons}
          />
          ) : null}
          <FormCheck success={success} formError={formError} />
        </form>
      </>
    );
    
}
