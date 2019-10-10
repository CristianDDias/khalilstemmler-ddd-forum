"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importStar(require("../models"));
const UniqueEntityID_1 = require("../../../../domain/UniqueEntityID");
const DomainEvents_1 = require("../../../../domain/events/DomainEvents");
const dispatchEventsCallback = (model, primaryKeyField) => {
    const aggregateId = new UniqueEntityID_1.UniqueEntityID(model[primaryKeyField]);
    DomainEvents_1.DomainEvents.dispatchEventsForAggregate(aggregateId);
};
(async function createHooksForAggregateRoots() {
    models_1.createModels();
    const { BaseUser, Member, Post } = models_1.default;
    console.log(Object.keys(models_1.default))
    BaseUser.addHook('afterCreate', (m) => dispatchEventsCallback(m, 'base_user_id'));
    BaseUser.addHook('afterDestroy', (m) => dispatchEventsCallback(m, 'base_user_id'));
    BaseUser.addHook('afterUpdate', (m) => dispatchEventsCallback(m, 'base_user_id'));
    BaseUser.addHook('afterSave', (m) => dispatchEventsCallback(m, 'base_user_id'));
    BaseUser.addHook('afterUpsert', (m) => dispatchEventsCallback(m, 'base_user_id'));
    Member.addHook('afterCreate', (m) => dispatchEventsCallback(m, 'member_id'));
    Member.addHook('afterDestroy', (m) => dispatchEventsCallback(m, 'member_id'));
    Member.addHook('afterUpdate', (m) => dispatchEventsCallback(m, 'member_id'));
    Member.addHook('afterSave', (m) => dispatchEventsCallback(m, 'member_id'));
    Member.addHook('afterUpsert', (m) => dispatchEventsCallback(m, 'member_id'));
    Post.addHook('afterCreate', (m) => dispatchEventsCallback(m, 'post_id'));
    Post.addHook('afterDestroy', (m) => dispatchEventsCallback(m, 'post_id'));
    Post.addHook('afterUpdate', (m) => dispatchEventsCallback(m, 'post_id'));
    Post.addHook('afterSave', (m) => dispatchEventsCallback(m, 'post_id'));
    Post.addHook('afterUpsert', (m) => dispatchEventsCallback(m, 'post_id'));
    console.log('[Hooks]: Sequelize hooks setup.');
})();
//# sourceMappingURL=index.js.map