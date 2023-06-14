import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestDelay(delaysec = 100, initialData = []) {
  const [data, setData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delaysec);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        console.log(e);
        setError("error");
      }
    }

    delayFunc();
  }, []);

  const updateRecord = (recordUpdated, doneCallback) => {
    const originalRecord = [...data];
    const newRecords = data.map((rec) => {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delaysec);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecord);
      }
    }

    delayFunction();
  };

  const insertRecord = (record, doneCallback) => {
    const originalRecord = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delaysec);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecord);
      }
    }

    delayFunction();
  };

  const deleteRecord = (record, doneCallback) => {
    const originalRecord = [...data];
    const newRecords = data.filter((rec) => {
      return rec.id != record.id;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delaysec);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecord);
      }
    }

    delayFunction();
  };

  return {
    requestStatus,
    error,
    updateRecord,
    data,
    insertRecord,
    deleteRecord,
  };
}

export default useRequestDelay;
