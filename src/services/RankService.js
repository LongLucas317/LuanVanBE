const Rank = require("../models/RankModel");

const createRank = (newRank) => {
  return new Promise(async (resolve, reject) => {
    const { name, min, max, amount, level } = newRank;

    try {
      const checkRank = await Rank.findOne({
        name: name,
      });
      if (checkRank !== null) {
        resolve({
          status: "ERR",
          message: "Rank is already",
        });
      }

      const createdRank = await Rank.create({
        name,
        min,
        max,
        amount,
        level,
      });

      if (createdRank) {
        resolve({
          status: "OK",
          message: "CREATE RANK SUCCESS",
          data: createdRank,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRank = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allRank = await Rank.find();

      resolve({
        status: "OK",
        message: "GET ALL RANK SUCCESS",
        data: allRank,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailRank = (rankId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rank = await Rank.findOne({
        _id: rankId,
      });
      if (rank === null) {
        resolve({
          status: "ERR",
          message: "Rank is not found",
        });
      }

      resolve({
        status: "OK",
        message: "GET RANK DETAIL SUCESSS",
        data: rank,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRank = (rankId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRank = await Rank.findOne({
        _id: rankId,
      });
      if (checkRank === null) {
        resolve({
          status: "OK",
          message: "Rank is not defined",
        });
      }

      const updatedRank = await Rank.findByIdAndUpdate(rankId, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "UPDATE RANK SUCCESS",
        data: updatedRank,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRank = (rankId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRank = await Rank.findOne({
        _id: rankId,
      });
      if (checkRank === null) {
        resolve({
          status: "ERR",
          message: "Rank is not defined",
        });
      }

      await Rank.findByIdAndDelete(rankId);

      resolve({
        status: "OK",
        message: "DELETE RANK SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createRank,
  getAllRank,
  getDetailRank,
  updateRank,
  deleteRank,
};
