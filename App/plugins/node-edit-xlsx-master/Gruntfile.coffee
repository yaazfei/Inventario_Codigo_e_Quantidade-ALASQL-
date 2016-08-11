module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-exec'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-este-watch'

  grunt.initConfig
    exec:
      ctags:
        command: 'ctags -e -R --fields=+afikKlmnsSzt --languages=js'
        cwd: './lib'
        stdout: true
        stderr: true

    coffee:
      compile:
        options:
          bare: true
          sourceMap: true

    esteWatch:
      options:
        dirs: ['./lib/**/', './tmp/**/']
        livereload:
          enabled: false

      coffee: (filepath) ->
        return if /\/qr_.+?\.coffee$/.test filepath
        files = [
          expand: true
          src: filepath
          ext: '.js'
        ]
        grunt.config ['coffee', 'compile', 'files'], files
        ['coffee:compile']

      js: (filepath) ->
        return if /^tmp\/|\/qr_.+?\.js$/.test filepath
        ['exec:ctags']

  grunt.registerTask 'default', ['exec:ctags', 'esteWatch']
