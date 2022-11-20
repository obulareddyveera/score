import { Formik, FieldArray } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveBoardScore } from "../store/boardSlice";

const ScoreBoard = () => {
  const dispatch = useDispatch();
  const [noteTheScore, setNoteTheScore] = useState(false);
  const board = useSelector((state) => {
    console.log("--==", state);
    return state.board;
  });
  console.log("--==", board);
  const addPlayersScore = () => {
    setNoteTheScore(!noteTheScore);
  };
  const saveScore = (params) => {
    saveBoardScore(params)(dispatch);
    setNoteTheScore(false);
  };
  return (
    <>
      <header aria-label="Site Header" class="bg-blue-600">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <a href="#" class="flex">
              <span class="sr-only">Logo</span>
              <span class="inline-block h-10 w-32 rounded-lg bg-gray-200"></span>
            </a>
          </div>
        </div>
      </header>
      <Formik
        initialValues={board}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <>
            <div className="m-2 flex justify-between">
              <div className="flex">
                <label
                  for="FirstName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <label
                  for="FirstName"
                  class="block text-sm font-medium text-gray-700"
                >
                  {values.name}
                </label>
              </div>

              <button
                onClick={() => addPlayersScore()}
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 btn-sm"
              >
                Add Score
              </button>
            </div>
            {noteTheScore ? (
              <>
                <Formik
                  initialValues={{
                    scores: [],
                  }}
                  validate={(values) => {
                    const errors = {};
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <>
                      <table class="min-w-full divide-y divide-gray-200 text-sm">
                        {board.players.map((rec, index) => {
                          return (
                            <tr>
                              <td class="sticky inset-y-0 left-0 bg-white px-4 py-2">
                                <label class="sr-only" for="Row3">
                                  Row 3
                                </label>

                                <input
                                  class="h-5 w-5 rounded border-gray-200"
                                  type="checkbox"
                                  id={`players[${index}].select`}
                                  name={`players[${index}].select`}
                                  checked={rec.select}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {rec.name}
                              </td>
                              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                <input
                                  type="text"
                                  id={rec.key}
                                  name={rec.key}
                                  value={values[rec.key]}
                                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  placeholder="Board Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                      <div className="flex justify-end">
                        <button
                          onClick={() => saveScore(values)}
                          class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 btn-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => addPlayersScore()}
                          class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </Formik>
              </>
            ) : (
              <div class="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 m-2">
                <table class="min-w-full divide-y divide-gray-200 text-sm">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                        <div class="flex items-center gap-2">#</div>
                      </th>
                      {board.players.map((col) => {
                        return (
                          <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            <div class="flex items-center gap-2">
                              {col.name}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    {board.scores.map((sr, index) => {
                      return (
                        <>
                          <tr>
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              {index + 1}
                            </td>
                            {board.players.map((rec) => {
                              return (
                                <>
                                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {sr[rec.key]}
                                  </td>
                                </>
                              );
                            })}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Formik>
    </>
  );
};

export default ScoreBoard;
