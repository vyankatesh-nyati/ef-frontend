import { CourseData } from "@/data/course_data";
import CourseElementModel from "@/models/CourseElementModel";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
// import HomePage from "..";
import AboutCourse from "@/components/course/AboutCourse";
import CourseContentContainer from "@/components/course/CourseContent";
import WhyProgram from "../../components/course/WhyProgram";
import MentorContainer from "@/components/course/MentorContainer";
import FAQSection from "@/components/course/FAQ/FAQSection";

export default function CoursePage(): JSX.Element {
  const router: NextRouter = useRouter();
  const coursePath: string | string[] | undefined = router.asPath;
  let foundCourseData: CourseElementModel | undefined = CourseData.find(
    (element: CourseElementModel) => element.path === coursePath
  );

  // useEffect(() => {
  //   if (coursePath == undefined) {
  //     router.push("/");
  //   }
  //   if (foundCourseData == undefined) {
  //     router.push("/");
  //   }
  // }, [coursePath, router, foundCourseData]);

  if (foundCourseData) {
    return (
      <>
        <AboutCourse data={foundCourseData.about_trining} />
        <CourseContentContainer data={foundCourseData.course_content} />
        <WhyProgram content={foundCourseData.why_program} />
        <MentorContainer />
        <FAQSection faq={foundCourseData.faq} />
      </>
    );
  }

  return <p>Something went wrong! Please try again...</p>;
}
