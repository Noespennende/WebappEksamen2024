'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/lib/services/api";
import { useLesson } from "@/hooks/useLesson";
import { useComment } from "@/hooks/useComments";
import { useCourse } from "@/hooks/useCourse";
import CreateCourseFields from "./CreateCourseFields";
import CreateLessonFields from "./CreateLessonFields";
import LessonCreateList, { LessonListProps } from "./LessonCreateList";
import CourseReview from "./CourseReview";
import FormCheck from "./FormCheck";
import NavigationByStep from "./NavigationByStep";
import { Lesson, Course, CourseFieldsProps, CreateCourse, CreateLesson } from "@/lib/types";
import { useCategories } from "@/hooks/useCategoriest";

  const isValidCourse = (courseFields: CourseFieldsProps['courseFields']) => {
    const invalidFields: string[] = [];
  
    if (!courseFields.title) invalidFields.push('title');
    if (!courseFields.slug) invalidFields.push('slug');
    if (!courseFields.description) invalidFields.push('description');
    console.log("Category value: ", courseFields.categoryId);
    if (!courseFields.categoryId) invalidFields.push('categoryId');
  
   
    if (invalidFields.length > 0) {
      console.log("Invalid course fields: ", invalidFields);
      return false;
    }
    return true;
  };

  const isValid = (lessons: CreateLesson[]): boolean => {
    return lessons.every(lesson => {
      return lesson.title 
      && lesson.slug && lesson.preAmble && lesson.text && lesson.text.length > 0;
    });
  };
  export const courseCreateSteps = [
    { id: '1', name: 'Kurs' },
    { id: '2', name: 'Leksjoner' },
  ]

export default function Create() {
    const courseSlug = "javascript"
    const lessonSlug = "variabler"
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [current, setCurrent] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(0);
    const [courseFields, setCourseFields] = useState<CreateCourse>({
      title: "",
      slug: "",
      description: "",
      categoryId: "",
      lessons: [],
    });
    const [lessons, setLessons] = useState<CreateLesson[]>([]);
    
    const { course } = useCourse(courseSlug);
    const lesson = useLesson(courseSlug, lessonSlug);


    const {categories} = useCategories()

    const categoryNames = categories.map((category: { name: string; }) => category.name);


    useEffect(() => {
      if (course && lesson) {
        const lessonArray = Array.isArray(lesson) ? lesson : [];
    
        setCourseFields((prevCourseFields) => ({
          ...prevCourseFields,
          title: course.title,
          slug: course.slug,
          description: course.description,
          categoryId: course.category.id,
          lessons: lessonArray.length > 0
            ? lessonArray.map((l) => ({
                title: l.title,
                slug: l.slug,
                preAmble: l.preAmble,
                comments: [],
                text: l.text.map((t: { id: string; text: string }) => ({
                  text: t.text,
                  orderPosition: 0,
                })),
              }))
            : [], 
        }));
      }
    }, [course, lesson]);


    



    const step = courseCreateSteps[current]?.name;
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      setFormError(false);
      setSuccess(false);
     

      if (lessons.length > 0 && isValid(lessons) && isValidCourse(courseFields)) {
        setSuccess(true);
        setCurrent(2);

        
        await createCourse({
          ...courseFields,
          categoryId: courseFields.categoryId, 
          lessons,
        });

        setTimeout(() => {
          //router.push("/courses"); hvis denne ligger her blir den automatisk pusha til leksjoner i create fjern denne for å teste det
        }, 500);
      } else {
        setFormError(true);
      }
    };
  
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
        console.log(`Field changed: ${name} = ${value}`)
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
          const updatedText = lessons[currentLesson]?.text.map((comment, i) => {
            if (i === index && name === 'text') {
              return { ...comment, text: value }; 
            }
            return comment; 
          });
      
          const updatedLessons = lessons.map((lesson, i) => {
            if (i === currentLesson) {
              return { 
                ...lesson, 
                [name]: value, 
                text: updatedText || [] 
              };
            }
            return lesson; 
          });
      
          setLessons(updatedLessons);
        }
      };

      const handleLessonFieldChange = (event: { target: { name: any; value: any; }; }, index: number) => {
        const { name, value } = event.target;
        let text;
        if (lessons[currentLesson]?.text?.length === 0) {
          text = [{ id: `${Math.floor(Math.random() * 1000 + 1)}`, text: "" }];
        }
        if (lessons[currentLesson]?.text?.length > 0) {
          text = lessons[currentLesson]?.text?.map((_text, i) => {
            if (i === index) {
              return { id: _text.id, [name]: value };
            }
            return _text;
          });
        }
    
        const updatedLessons = lessons.map((lesson, i) => {
          if (i === currentLesson) {
            return { ...lesson, [name]: value, text: text?.length > 0 ? text : [] };
          }
          return lesson;
        });
        setLessons(updatedLessons);
      };

  
    const changeCurrentLesson = (index: number) => {
      setCurrentLesson(index);
    };
 
   
    const addLesson = () => {
      setLessons((prev) => [
        ...prev,
        {
          id: `${Math.floor(Math.random() * 1000 + 1)}`,
          title: "",
          slug: "",
          preAmble: "",
          text: [],
        },
      ]);
      setCurrentLesson(lessons.length);
    };


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategoryId = event.target.value;
    
      const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);
      console.log("selected cat " + selectedCategory?.name)
      
      setCourseFields((prev) => ({
        ...prev,
        categoryId: selectedCategory?.id || prev.categoryId,
      }));
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
                  handleLessonFieldChange={handleLessonFieldChange}
                  addTextBox={addTextBox}
                  removeTextBox={removeTextBox}
                  
                />
              ) : null}
            </div>
          ) : null}

          {formError ? (
            <p data-testid="form_error">Fyll ut alle felter med *</p>
          ) : null}
          {success ? (
            <p className="text-emerald-600" data-testid="form_success">
              Skjema sendt
            </p>
          ) : null}
          {current === 2 ? ( 
            <CourseReview courseFields={{
        ...courseFields, 
            category: courseFields.category || '', 
    }} lessons={lessons} />
          ) : null} 
          <FormCheck success={success} formError={formError} />
        </form>
      </>
    );
    
}
