const templateModel = require("../models/templateModel");

exports.getAllTemplates = async (req, res, next) => {
  try {
    const templates = await templateModel.getAllTemplates();
    // console.log("all templates from db:", templates);
    res.locals.templates = templates || [];

    // res.locals.service = document.getElementById("templates").value;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// exports.getTemplateById = async (req, res) => {
//   try {
//     const templateId = req.params.id;
//     const template = await templateModel.getTemplateById(templateId);

//     if (!template) {
//       return res.status(404).json({ error: "Template not found" });
//     }
//     res.locals.template = template;
//     // res.json(template);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
