const cardModel = require("./card.model");
const listModel = require("../list/list.model");
const _ = require("lodash");

exports.createCard = (req, res, next) => {
  console.log(req.body);
  const newCard = new cardModel({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    list: req.body.list,
    position: req.body.position
  });

  newCard
    .save()
    .then(card => {
      listModel
        .findByIdAndUpdate(card.list, { $push: { cards: card } }, { new: true })
        .then(list => {
          res.status(200).json(card);
        });
    })
    .catch(error => next(error));
};

exports.editCard = (req, res, next) => {
  const id = req.body.id;
  const newCard = new cardModel({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    list: req.body.list,
    position: req.body.position
  });

  newCard = _.pickBy(newCard, _.identity);

  listModel.findByIdAndUpdate(id, newCard, { new: true }).then(card => {
    res.status(200).json(card);
  });
};

exports.transferCard = function(req, res ,next) {
	const cardId = req.params.id;
	const sourceList = req.body.from;
	const targetList = req.body.to;
	cardModel.findByIdAndUpdate(cardId, {$set: {list: targetList}}, {new: true})
	.then(card => {
			Promise.all([
				listModel.findByIdAndUpdate(sourceList, { $pull: { cards: cardId }}).exec(),
				listModel.findByIdAndUpdate(targetList, { $push: { cards: cardId }}).exec()
			])
			.then(list => res.status(200).json({ message: 'card successfully updated', list: list }))
		})
	.catch(error => next(error))
};

exports.removeCard = function(req, res) {
  const cardId = req.params.id;
  cardModel
    .findByIdAndRemove(cardId)
    .then(response => {
      listModel
        .findOneAndUpdate(
          { cards: cardId },
          { $pull: { cards: cardId } },
          { new: true }
        )
        .then(list => {
          res.status(200).json({ message: "Card removed!" });
        });
    })
    .catch(error => next(error));
};
