import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

export function AddStudent() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursePreferences, setCoursePreferences] = useState("");
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [identificationCopy, setIdentificationCopy] = useState(null);
  const [academicTranscripts, setAcademicTranscripts] = useState(null);
  // const [startDate, setStartDate] = useState(new Date());

  const handlePassportPhotoChange = (event) => {
    setPassportPhoto(event.target.files[0]);
  };

  const handleIdentificationCopyChange = (event) => {
    setIdentificationCopy(event.target.files[0]);
  };

  const handleAcademicTranscriptsChange = (event) => {
    setAcademicTranscripts(event.target.files[0]);
  };

  const handleCourseSelection = (course) => {
    const updatedCourses = [...selectedCourses];

    if (updatedCourses.includes(course)) {
      updatedCourses.splice(updatedCourses.indexOf(course), 1);
    } else {
      updatedCourses.push(course);
    }

    setSelectedCourses(updatedCourses);
  };

  // Sample array of courses
  const availableCourses = ["Course A", "Course B", "Course C", "Course D"];

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div class="mt-10 sm:mt-0">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  {/* <h2>Personal Information</h2> */}
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first_name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autocomplete="given-name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="middle_name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Middle name
                      </label>
                      <input
                        type="text"
                        name="middle_name"
                        id="middle_name"
                        autocomplete="given-name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="last_name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autocomplete="family-name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="date_of_birth"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="place_of_birth"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Place of Birth
                      </label>
                      <input
                        type="text"
                        name="place_of_birth"
                        id="place_of_birth"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label
                        for="email_address"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email_address"
                        id="email_address"
                        autocomplete="email"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="country"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Country / Region
                      </label>
                      <select
                        id="country"
                        name="country"
                        autocomplete="country"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div class="col-span-6">
                      <label
                        for="street_address"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street_address"
                        id="street_address"
                        autocomplete="street-address"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        for="city"
                        class="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="state"
                        class="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="postal_code"
                        class="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        autocomplete="postal-code"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="phone_number"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        autocomplete="Phone Number"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="emergency_contact_name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        name="emergency_contact_name"
                        id="emergency_contact_name"
                        autocomplete="emergency_contact_name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="emergency_contact_phone_number"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Emergency Contact Phone Number
                      </label>
                      <input
                        type="text"
                        name="emergency_contact_phone_number"
                        id="emergency_contact_phone_number"
                        autocomplete="emergency_contact_phone_number"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="student_id"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Student ID
                      </label>
                      <input
                        type="text"
                        id="student_id"
                        name="student_id"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* Admission Date */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="admission_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Admission Date
                      </label>
                      <input
                        type="date"
                        name="date_of_admission"
                        id="date_of_admission"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Expected Graduation Date */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="expected_graduation_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expected Graduation Date
                      </label>
                      <input
                        type="date"
                        name="date_of_graduation"
                        id="date_of_graduation"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Previous Educational Institution */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="previous_educational_institution"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Previous Educational Institution
                      </label>
                      <input
                        type="text"
                        id="previous_educational_institution"
                        name="previous_educational_institution"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Previous Graduation Date (if applicable) */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="previous_graduation_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Previous Graduation Date (if applicable)
                      </label>
                      <input
                        type="date"
                        name="date_of_previous_graduation"
                        id="date_of_previous_graduation"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Program/Department */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="program_department"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Program/Department
                      </label>
                      <input
                        type="text"
                        id="program_department"
                        name="program_department"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Batch/Class */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="batch_class"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Batch/Class
                      </label>
                      <input
                        type="text"
                        id="batch_class"
                        name="batch_class"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Current Semester/Year */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="current_semester_year"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Semester/Year
                      </label>
                      <input
                        type="text"
                        id="current_semester_year"
                        name="current_semester_year"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="course_selection"
                        className="block text-sm font-medium text-gray-700"
                      >
                        List of available courses with checkboxes for selection
                      </label>
                      <select
                        multiple
                        id="course_selection"
                        name="course_selection"
                        onChange={handleCourseSelection}
                        className="mt-1 w-auto block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {availableCourses.map((course) => (
                          <option key={course} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="course_preferences"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Course preferences or majors (if applicable)
                      </label>
                      <input
                        type="text"
                        id="course_preferences"
                        name="course_preferences"
                        value={coursePreferences}
                        onChange={(e) => setCoursePreferences(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="passport_photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Passport-sized Photo
                      </label>
                      <input
                        type="file"
                        id="passport_photo"
                        name="passport_photo"
                        accept="image/*"
                        onChange={handlePassportPhotoChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="identification_copy"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Scanned Copy of Identification (e.g., Passport, Driver's
                        License)
                      </label>
                      <input
                        type="file"
                        id="identification_copy"
                        name="identification_copy"
                        accept="image/*,application/pdf"
                        onChange={handleIdentificationCopyChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="academic_transcripts"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Previous Academic Transcripts (if applicable)
                      </label>
                      <input
                        type="file"
                        id="academic_transcripts"
                        name="academic_transcripts"
                        accept="application/pdf"
                        onChange={handleAcademicTranscriptsChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
