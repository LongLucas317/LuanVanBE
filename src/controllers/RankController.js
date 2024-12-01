const RankService = require("../services/RankService");

const createRank = async (req, res) => {
  try {
    const { name, min, max, amount, level } = req.body;

    if (!name || !min || !max || !amount || !level) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is Required!",
      });
    }

    const response = await RankService.createRank(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllRank = async (req, res) => {
  try {
    const response = await RankService.getAllRank();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailRank = async (req, res) => {
  try {
    const rankId = req.params.id;
    if (!rankId) {
      return res.status(200).json({
        status: "ERR",
        message: "Rank ID is required",
      });
    }
    const response = await RankService.getDetailRank(rankId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateRank = async (req, res) => {
  try {
    const rankId = req.params.id;
    const data = req.body;
    if (!rankId) {
      return res.status(200).json({
        status: "ERR",
        message: "Rank ID is required",
      });
    }
    const response = await RankService.updateRank(rankId, data);
    return res.status(200).json(response);
  } catch (e) {
    console.log("e: ", e);

    return res.status(404).json({
      message: e,
    });
  }
};

const deleteRank = async (req, res) => {
  try {
    const rankId = req.params.id;
    if (!rankId) {
      return res.status(200).json({
        status: "ERR",
        message: "Rank ID is required",
      });
    }
    const response = await RankService.deleteRank(rankId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createRank,
  getAllRank,
  getDetailRank,
  updateRank,
  deleteRank,
};
