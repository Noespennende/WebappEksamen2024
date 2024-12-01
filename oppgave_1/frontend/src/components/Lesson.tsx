'use client';
import { useComment } from "@/hooks/useComments";
import { useCourse } from "@/hooks/useCourse";
import { useLesson } from "@/hooks/useLesson";
import { getComments, createComment } from "@/lib/services/api";
import { ALesson, CommentNoLesson } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Lesson({ courseSlug, lessonSlug }: { courseSlug: string , lessonSlug: string}) {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [lessonComments, setComments] = useState<CommentNoLesson[]>([]);
    //const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    //const [lesson, setLesson] = useState(null);
    //const [course, setCourse] = useState(null);
    
   
    const [commentBody, setCommentBody] = useState("");
    const lesson: ALesson | undefined = useLesson(courseSlug, lessonSlug);
    const { course } = useCourse(courseSlug);
    
    const lessonComment = useComment(courseSlug, lessonSlug);
    useEffect(() => {
      if (Array.isArray(lessonComment)) {
        const formattedComments = lessonComment.map((comment) => ({
          id: comment.id,
          comment: comment.comment,
          createdBy: comment.createdBy,
        }));
        setComments(formattedComments);
      } else {
        console.log("No comments found or invalid format.");
        setComments([]); 
      }
    }, [lessonComment]);
  
    useEffect(() => {
  
    }, [lessonComment]);
  
    const handleComment = (event: any) => {
      setCommentBody(event.target.value);
    };
  
    const handleName = (event: any) => {
      setName(event.target.value);
    };
  
    const handleSubmit = async (event:any) => {
      event.preventDefault();
      setFormError(false);
      setSuccess(false);
      if (!commentBody || !name) {
        setFormError(true);

        

      } else {
        const comment = {
          comment: commentBody,
          createdById: "2cf48635-28f4-4747-a300-a64e7cbad9f7"
        };
        

        console.log("comment is.. ", comment )
        try {
          await createComment(comment, courseSlug, lessonSlug);
        } catch(error) {
          console.log("mh ", error)
        }
        const commentsData = await getComments(courseSlug, lessonSlug);
        setComments(commentsData);
        console.log('Fetched comments:', commentsData);
        setSuccess(true);
      }
    };
  /*
    useEffect(() => {
      const getContent = async () => {
        const lessonDate = await getLesson(courseSlug, lessonSlug);
        const courseData = await getCourse(courseSlug, lessonSlug);
        const commentsData = await getComments(lessonSlug);
        setLesson(lessonDate);
        setCourse(courseData);
        setComments(commentsData);
      };
      getContent();
    }, [courseSlug, lessonSlug]);*/
  
    return (
      <div>
        <div className="flex justify-between">
          <h3 data-testid="course_title" className="mb-6 text-base font-bold">
            <a className="underline" href={`/courses/${course?.slug}`}>
              {course?.title}
            </a>
          </h3>
          <span data-testid="course_category">
            Kategori: <span className="font-bold">{course?.category?.name}</span>
          </span>
        </div>
        <h2 className="text-2xl font-bold" data-testid="lesson_title">
          {lesson?.title}
        </h2>
        <p
          data-testid="lesson_preAmble"
          className="mt-4 font-semibold leading-relaxed"
        >
          {lesson?.preAmble}
        </p>
        {lesson?.text.length > 0 &&
          lesson?.text.map((text) => (
            <p
              data-testid="lesson_text"
              className="mt-4 font-normal"
              key={text.id}
            >
              {text.text}
            </p>
          ))}
        <section data-testid="comments">
          <h4 className="mt-8 mb-4 text-lg font-bold">
            Kommentarer ({lessonComments?.length})
          </h4>
          <form data-testid="comment_form" onSubmit={handleSubmit} noValidate>
            <label className="mb-4 flex flex-col" htmlFor="name">
              <span className="mb-1 text-sm font-semibold">Navn*</span>
              <input
                data-testid="form_name"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleName}
                className="w-full rounded bg-slate-100"
              />
            </label>
            <label className="mb-4 flex flex-col" htmlFor="comment">
              <span className="mb-1 text-sm font-semibold">
                Legg til kommentar*
              </span>
              <textarea
                data-testid="form_textarea"
                type="text"
                name="comment"
                id="comment"
                value={commentBody}
                onChange={handleComment}
                className="w-full rounded bg-slate-100"
                cols="30"
              />
            </label>
            <button
              className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
              data-testid="form_submit"
              type="submit"
            >
              Legg til kommentar
            </button>
            {formError ? (
              <p className="font-semibold text-red-500" data-testid="form_error">
                Fyll ut alle felter med *
              </p>
            ) : null}
            {success ? (
              <p
                className="font-semibold text-emerald-500"
                data-testid="form_success"
              >
                Skjema sendt
              </p>
            ) : null}
          </form>
          <ul className="mt-8" data-testid="comments_list">
            {lessonComments?.length > 0
              ? lessonComments.map((c) => (
                  <li
                    className="mb-6 rounded border border-slate-200 px-4 py-6"
                    key={c.id}
                  >
                    <h5 data-testid="user_comment_name" className="font-bold">
                      {c.createdBy.name}
                    </h5>
                    <p data-testid="user_comment">{c.comment}</p>
                  </li>
                ))
              : null}
          </ul>
        </section>
      </div>
    );
  }