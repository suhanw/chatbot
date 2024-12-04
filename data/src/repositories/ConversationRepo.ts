import { IConversation, Conversation } from "../models/Conversation";

export interface IConversationRepo {
  create: (conversation: IConversation) => Promise<IConversation>;
  findByUser: (userId: string) => Promise<IConversation[]>;
  findById: (
    conversationId: string,
    userId: string
  ) => Promise<IConversation | null>;
  update: (conversation: IConversation) => Promise<IConversation | null>;
}

export class ConversationRepo implements IConversationRepo {
  async create(conversation: IConversation) {
    return await Conversation.create(conversation);
  }

  async update(conversation: IConversation) {
    return await Conversation.findOneAndUpdate(
      { _id: conversation._id },
      conversation,
      { new: true }
    ).exec();
  }

  async findById(conversationId: string, userId: string) {
    return await Conversation.findOne({
      _id: conversationId,
      user: userId,
    }).exec();
  }

  async findByUser(userId: string) {
    return await Conversation.find({ user: userId }).select("_id").exec();
  }
}
