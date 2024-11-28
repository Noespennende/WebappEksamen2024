export type Comments = {
    id: string;
    text: string;
  };
  
  export type ALesson = {
    id: string;
    title: string;
    slug: string;
    preAmble: string;
    text: Comments[]; 
  };
  
  export type Course = {
    id: string;
    title: string;
    slug: string;
    description: string;
    lessons: ALesson[]; 
    category: Category[];
  };

  export type Comment = {
    id: string;
    createdBy: {
      id: number;
      name: string;
    };
    comment: string;
    lesson: {
      slug: string;
    };
  };
export type Category ={
  id: String;
  name: String;
}
  