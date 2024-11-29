export type Comments = {
    id: string;
    text: string;
  };

export type Category = {
  id: string;
  name: string;
};
  
  export type ALesson = {
    id: string;
    title: string;
    slug: string;
    preAmble: string;
    text: Comment[]; 
  };
  
  export type Course = {
    id: string;
    title: string;
    slug: string;
    description: string;
    lessons?: ALesson[]; 
    category: Category[];
  };

  export type Comment = {
    id: string;
    createdBy: {
        id: string;  
        name: string;
    };
    comment: string;
    lesson: {
        slug: string;
    };
  };

  export type CommentNoLesson = {
    id: string;
    createdBy: {
        id: string;  
        name: string;
    };
    comment: string;
  };



export interface CourseFieldsProps {
  courseFields: {
    title: string;
    slug: string;
    description: string;
    category: Category[]; 
    lessons?: ALesson[];
  };
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[]; // Assuming categories is also an array of Category objects
}
  