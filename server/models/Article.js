'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Article {
  static async all() {
    return await db('articles')
  }

  static async create(article) {
    const [ids] = await db('articles').insert({
      author_username: article.author_username,
      title: article.title,
      image_path: article.image_path,
      description: article.description,
    }, ['id'])

    const new_article = await db('articles').where({ id: ids.id }).first()

    return new_article
  }

  static async find(filter) {
    return await db('articles').where(filter).first()
  }

  static async update(id, article) {
    const changes = {}
    // TODO title
    // TODO image_path
    // TODO description
    // TODO published_at ( if true/false { timestamp/null })
    changes.updated_at = new Date()

    await db('articles').where({ id: id }).update(changes)

    const new_article = await db('articles').where({ id: id }).first()

    return new_article
  }

  static async destroy(id) {
    return await db('articles').where({ id: id }).del()
  }
}

/**
 * Export model
 */

module.exports = Article
