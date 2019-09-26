<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>{{ $t('adminPage.overview.title') }}</h1>
            <p>{{ $t('adminPage.overview.text') }}</p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/overview.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
      </div>
    </div>

    <b-alert show variant="info mt-2">
    <h4 class="alert-heading"><i class="fas fa-exclamation-triangle"></i> under construction</h4>
    <hr>
    <p>
      this page will contain graphs and widgets to show the current business state
    </p>
    <p class="mb-0">
      the new version of app is coming soon!
    </p>
  </b-alert>

  </div>
</template>
<script>

</script>
