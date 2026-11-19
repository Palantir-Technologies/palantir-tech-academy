<template>
  <section id="courses" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-3.5 py-1 text-xs text-indigo-300 backdrop-blur-md mb-4">
        <span>⚡ 30 Specialized Technologies</span>
        <span class="text-slate-600">•</span>
        <span class="text-emerald-400 font-semibold">Self-Paced & Mentor-Led</span>
      </div>
      <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Comprehensive Courses & Technology Catalog
      </h2>
      <p class="mt-3 text-sm text-slate-400">
        Industry-vetted curriculums in PHP, WordPress, Python, React, AI, DevOps, Mobile, and Cloud. Every course includes hands-on labs, live code reviews, and verifiable completion certification.
      </p>
    </div>

    <!-- Filter & Search Controls -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800/80 mb-10 space-y-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="relative w-full md:w-96">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 text-sm">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search PHP, WordPress, Python, Flutter, AI..."
            class="w-full rounded-2xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
        </div>

        <!-- Price Sort & Stats -->
        <div class="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <span class="text-xs text-slate-400 hidden sm:inline">
            Showing <strong class="text-white">{{ filteredCourses.length }}</strong> of {{ courses.length }} courses
          </span>

          <select
            v-model="sortBy"
            class="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="featured">Featured Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-800/60">
        <button
          @click="selectedCategory = 'all'"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'border border-slate-800 bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
          ]"
        >
          All ({{ courses.length }})
        </button>

        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
            selectedCategory === cat
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'border border-slate-800 bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Courses Grid (30 Courses) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        class="glass-panel rounded-3xl p-6 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between transition-all group hover:scale-[1.01]"
      >
        <div>
          <!-- Top Badges -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="rounded-lg bg-indigo-950/80 border border-indigo-800/60 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
              {{ course.category }}
            </span>
            <div class="flex items-center gap-1.5">
              <span v-if="course.badge" class="rounded-lg bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                {{ course.badge }}
              </span>
              <span class="rounded-lg bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                {{ course.level }}
              </span>
            </div>
          </div>

          <!-- Course Title -->
          <h3 class="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
            {{ course.title }}
          </h3>

          <!-- Description -->
          <p class="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {{ course.description }}
          </p>

          <!-- Duration & Rating Info -->
          <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span class="flex items-center gap-1 text-slate-300 font-medium">
              ⏱️ {{ course.duration }}
            </span>
            <span class="flex items-center gap-1 text-amber-400 font-bold">
              ★ {{ course.rating.toFixed(1) }} <span class="text-slate-500 font-normal">({{ course.enrolled_count }} enrolled)</span>
            </span>
          </div>

          <!-- Tags -->
          <div v-if="course.tags && course.tags.length" class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="tag in course.tags.slice(0, 4)"
              :key="tag"
              class="rounded-md bg-slate-900/80 border border-slate-800/70 px-2 py-0.5 text-[10px] text-slate-400 font-mono"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Pricing & Action Button -->
        <div class="mt-6 pt-4 border-t border-slate-800/80">
          <div class="flex items-baseline justify-between mb-3">
            <div>
              <span class="text-2xl font-extrabold text-white">₹{{ course.price.toLocaleString() }}</span>
              <span v-if="course.original_price" class="ml-2 text-xs text-slate-500 line-through">
                ₹{{ course.original_price.toLocaleString() }}
              </span>
            </div>
            <span
              v-if="course.original_price"
              class="rounded-md bg-emerald-950/80 border border-emerald-900/60 px-2 py-0.5 text-[10px] font-bold text-emerald-400"
            >
              {{ Math.round((1 - course.price / course.original_price) * 100) }}% OFF
            </span>
          </div>

          <button
            @click="$emit('enroll', course)"
            class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Enroll in This Track →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCourses } from '~/composables/useCourses'

defineEmits(['enroll'])

const { courses, initCourses } = useCourses()
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('featured')

onMounted(() => {
  initCourses()
})

const categories = computed(() => {
  const cats = new Set(courses.value.map(c => c.category))
  return Array.from(cats).sort()
})

const filteredCourses = computed(() => {
  return courses.value
    .filter(c => {
      const matchesCat = selectedCategory.value === 'all' || c.category === selectedCategory.value
      const query = searchQuery.value.toLowerCase().trim()
      const matchesSearch = !query ||
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(query)))
      return matchesCat && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price
      if (sortBy.value === 'price-desc') return b.price - a.price
      if (sortBy.value === 'rating') return b.rating - a.rating
      return 0
    })
})
</script>

