import { useServerSupabase } from '../../utils/supabase'
import { INITIAL_30_COURSES } from '../../../composables/useCourses'

export default defineEventHandler(async (event) => {
  const supabase = useServerSupabase()

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('price', { ascending: true })

    if (error || !data || data.length === 0) {
      // If table doesn't have rows yet, return the comprehensive 30 courses
      return {
        success: true,
        source: 'catalog_seed',
        data: INITIAL_30_COURSES
      }
    }

    return {
      success: true,
      source: 'database',
      data
    }
  } catch (err: any) {
    return {
      success: true,
      source: 'fallback',
      data: INITIAL_30_COURSES
    }
  }
})

