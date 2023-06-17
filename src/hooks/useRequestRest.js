import { useState, useEffect } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestRest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");
  const restUrl = "api/speakers";

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    async function delayFunc() {
      try {
        const result = await axios.get(restUrl);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(result.data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        console.log(e);
        setError("error");
      }
    }

    delayFunc();
  }, []);

  const updateRecord = (recordUpdated, doneCallback) => {
    console.log(`The new fav = ${recordUpdated.favorite}`);
    const originalRecord = [...data];
    const newRecords = data.map((rec) => {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${recordUpdated.id}`, recordUpdated);
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
        await axios.post(`${restUrl}/99999`, record);
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
        await axios.delete(`${restUrl}/${record.id}`);
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

export default useRequestRest;
