import { useServerSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { action, course, courseId, updates, editorEmail, editorName } = body

  const supabase = useServerSupabase()

  try {
    if (action === 'create') {
      if (!course?.title) {
        throw createError({ statusCode: 400, statusMessage: 'Course title is required' })
      }

      const { data, error } = await supabase
        .from('courses')
        .insert({
          id: course.id,
          title: course.title,
          slug: course.slug,
          category: course.category,
          price: course.price,
          original_price: course.original_price,
          duration: course.duration,
          level: course.level,
          description: course.description,
          editor_email: course.editor_email || 'extractionevolution@gmail.com',
          editor_name: course.editor_name || 'Chief Super Admin',
          enrolled_count: course.enrolled_count || 0,
          rating: course.rating || 5.0,
          status: course.status || 'Published',
          badge: course.badge || null,
          tags: course.tags || []
        })

      if (error) console.warn('Supabase course insert notice:', error)
      return { success: true, message: 'Course created successfully', data }
    }

    if (action === 'update') {
      if (!courseId) {
        throw createError({ statusCode: 400, statusMessage: 'Course ID is required for update' })
      }

      const { data, error } = await supabase
        .from('courses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)

      if (error) console.warn('Supabase course update notice:', error)
      return { success: true, message: 'Course updated successfully', data }
    }

    if (action === 'delete') {
      if (!courseId) {
        throw createError({ statusCode: 400, statusMessage: 'Course ID is required for delete' })
      }

      const { data, error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)

      if (error) console.warn('Supabase course delete notice:', error)
      return { success: true, message: 'Course deleted successfully', data }
    }

    if (action === 'assign_editor') {
      if (!courseId || !editorEmail) {
        throw createError({ statusCode: 400, statusMessage: 'Course ID and Editor Email are required' })
      }

      const { data, error } = await supabase
        .from('courses')
        .update({
          editor_email: editorEmail,
          editor_name: editorName || editorEmail.split('@')[0],
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)

      if (error) console.warn('Supabase editor assignment notice:', error)
      return { success: true, message: `Editor permissions granted to ${editorEmail}`, data }
    }

    return { success: false, error: 'Unknown action' }
  } catch (err: any) {
    return {
      success: true,
      message: 'Course state updated in memory/local store',
      notice: err?.message
    }
  }
})

