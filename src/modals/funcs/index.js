import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  where,
  query,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestoreDb } from "../../../firebase";
import uuid from "react-uuid";

// check if class Exists and remove
const existanceCheck = async (id) => {
  const classRef = doc(firestoreDb, "class", id);
  const classSnap = await getDoc(classRef);
  if (classSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
const checkClassExists = async (teacherId) => {
  const teacherRef = doc(firestoreDb, "teachers", teacherId);
  const teacherSnap = await getDoc(teacherRef);
  var teacher = teacherSnap.data();
  teacher.class.map((oneClass) => {
    if (!existanceCheck(oneClass)) {
      removeSingleClassToTeacher(oneClass, teacher);
    }
  });
};

// check if course Exists and remove
const existanceCheckcourse = async (id) => {
  const classRef = doc(firestoreDb, "courses", id);
  const classSnap = await getDoc(classRef);
  if (classSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
const checkCourseExists = async (teacherId) => {
  const teacherRef = doc(firestoreDb, "teachers", teacherId);
  const teacherSnap = await getDoc(teacherRef);
  var teacher = teacherSnap.data();
  console.log(teacher);
  teacher.course.map((oneClass) => {
    if (existanceCheckcourse(oneClass) == false) {
      console.log("data");
      removeSingleCourseToTeacher(oneClass, teacher);
    }
  });
};

//  Course is created
const addSingleCourseToClass = async (classId, courseId, school) => {
  const classRef = doc(firestoreDb, "schools", `${school}/class`, classId);
  await updateDoc(classRef, {
    course: arrayUnion(courseId),
  });
};
const removeSingleCourseFromClass = async (classId, courseId, school) => {
  const classRef = doc(firestoreDb, "schools", `${school}/class`, classId);
  await updateDoc(classRef, {
    course: arrayRemove(courseId),
  });
};

// Class Is Created
const addSingleClassToCourse = async (courseId, classId) => {
  const classRef = doc(firestoreDb, "courses", courseId);
  await updateDoc(classRef, {
    course: arrayUnion(classId),
  });
};
const addSingleClassToCourses = async (courseId, classId, school) => {
  const classRef = doc(firestoreDb, "schools", `${school}/courses`, courseId);
  await updateDoc(classRef, {
    class: classId,
    // course_name:
  });
};
const removeSingleClassFromCourse = async (courseId, classId) => {
  const classRef = doc(firestoreDb, "courses", courseId);
  await updateDoc(classRef, {
    course: arrayRemove(classId),
  });
};

// Course Is
const addClassIDToCourse = async (classId, courseId) => {
  const teacherRef = doc(firestoreDb, "courses", courseId);

  await updateDoc(teacherRef, {
    class: classId,
  });
};

// Add Couse To Teachers
const addSingleCourseToTeacher = async (courseId, teacherId, school) => {
  const teacherRef = doc(
    firestoreDb,
    "schools",
    `${school}/teachers`,
    teacherId
  );

  await updateDoc(teacherRef, {
    course: arrayUnion(courseId),
  });
};

const removeSingleCourseToTeacher = async (courseId, teacherId, school) => {
  const teacherRef = doc(
    firestoreDb,
    "schools",
    `${school}/teachers`,
    teacherId
  );
  await updateDoc(teacherRef, {
    course: arrayRemove(courseId),
  });
};

// add class to teacher
const addSingleClassToTeacher = async (classId, teacherId, school) => {
  const teacherRef = doc(
    firestoreDb,
    "schools",
    `${school}/teachers`,
    teacherId
  );
  await updateDoc(teacherRef, {
    class: arrayUnion(classId),
  });
};
const removeSingleClassToTeacher = async (classId, teacherId) => {
  const teacherRef = doc(firestoreDb, "teachers", teacherId);
  await updateDoc(teacherRef, {
    class: arrayRemove(classId),
  });
};

// Teachers
const addSingleTeacherToCourse = async (teacherId, courseId, school) => {
  // await checkClassExists(teacherId);
  const teacherRef = doc(firestoreDb, "schools", `${school}/courses`, courseId);
  await updateDoc(teacherRef, {
    teachers: arrayUnion(teacherId),
  });
};

const addTeacherexits = async (teacherId, classId, courseId) => {
  await checkCourseExists(teacherId);
  const teacherRef = doc(firestoreDb, "teacher", teacherId);
  await updateDoc(teacherRef, {
    class: arrayUnion(classId),
    course: arrayUnion(courseId),
  });
};

// const addSingleTeacherToCourse = async (teacherId, courseId) => {
//   await checkClassExists(teacherId);
//   const teacherRef = doc(firestoreDb, "courses", courseId);
//   await updateDoc(teacherRef, {
//     teachers: arrayUnion(teacherId),
//   });
// };

const removeTeacherClassfromCourse = async (teacherId, courseId) => {
  const teacherRef = doc(firestoreDb, "courses", courseId);
  await updateDoc(teacherRef, {
    teachers: arrayRemove(teacherId),
  });
};

// parents
const createParentwhithStudent = async (phoneNumber, schoolId) => {
  var parent = {
    phoneNumber: phoneNumber,
    role: {
      isAdmin: false,
      isParent: true,
      isTeacher: false,
    },
    school: schoolId,
  };
  const uid = uuid();
  await setDoc(doc(firestoreDb, "users", uid), parent);
};
// fetchParents
const fetchParents = async (phons) => {
  var temporary = [];
  const q = query(
    collection(firestoreDb, "users"),
    where("phoneNumber", "in", phons)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    var datas = doc.data();
    temporary.push(datas);
    console.log(datas);
  });

  return temporary;
};
// fetchSection
const fetchSubject = async (sectionId) => {
  const teacherRef = doc(firestoreDb, "subject", sectionId);
  const docSnap = await getDoc(teacherRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return "";
  }
};
const fetchTeacher = async (sectionId) => {
  const teacherRef = doc(firestoreDb, "teachers", sectionId);
  const docSnap = await getDoc(teacherRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return "";
  }
};
const fetchclassFromCourse = async (sectionId, school) => {
  const teacherRef = doc(
    firestoreDb,
    "schools",
    `${school}/courses`,
    sectionId
  );
  const docSnap = await getDoc(teacherRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return "";
  }
};

const fetchClass = async (sectionId) => {
  const teacherRef = doc(firestoreDb, "class", sectionId);
  const docSnap = await getDoc(teacherRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return "";
  }
};
const fetchCourse = async (courseId) => {
  const teacherRef = doc(firestoreDb, "courses", courseId);
  const docSnap = await getDoc(teacherRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return "";
  }
};

export {
  addSingleTeacherToCourse,
  removeTeacherClassfromCourse,
  addSingleCourseToClass,
  addClassIDToCourse,
  removeSingleCourseFromClass,
  addSingleClassToCourse,
  removeSingleClassFromCourse,
  addSingleCourseToTeacher,
  removeSingleCourseToTeacher,
  addSingleClassToTeacher,
  removeSingleClassToTeacher,
  createParentwhithStudent,
  addSingleClassToCourses,
  fetchclassFromCourse,
  fetchParents,
  fetchSubject,
  fetchClass,
  fetchTeacher,
  fetchCourse,
};
